class Payment {
    constructor(url, styling) {
        if (url == undefined)
            url = "";
        if (styling == undefined)
            styling = "";

        this.url = url;
        this.styling = styling;
        this.instrument = undefined;
        this.openInstrument = undefined;
    }

    applyStyling() {
        var inputLink = $("#hvUrl").val();
        var styling = $("#style").val();
        if (inputLink !== "") {
            this.url = inputLink;
        }
        if (styling !== "") {
            this.styling = JSON.parse(styling);
        }
        if (inputLink !== "") {
            this.injectScript(this.url).then(() => {
                console.log("Successfully loaded script!");
            }).catch(error => {
                console.log(error);
            });
        }
    }
    injectScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.async = false;
            script.src = src;
            script.addEventListener('load', resolve);
            script.addEventListener('error', () => reject('Error loading script.'));
            script.addEventListener('abort', () => reject('Script loading aborted.'));
            document.head.appendChild(script);
        });
    }
    iframeClose(instrument) {
        this.setInstrument(instrument, close());
    }
    iframeOpen(instrument) {
        var container = {
            container: 'payment-container',
            // onPaymentCompleted:  () => { this.paymentComplete() },
            style: this.styling
        };
        this.setInstrument(instrument, container, open());
    }
    iframeUpdate() {
        var container = {
            container: 'payment-container',
            // onPaymentCompleted:  () => { this.paymentComplete() },
            style: this.styling
        };
        this.setInstrument(instrument, update(container));
    }
    kickit() {
        var urlSplit = this.url.split("/");
        this.instrument = urlSplit[3];

        if (this.openInstrument != undefined)
            this.iframeClose(this.instrument);

        this.iframeOpen(this.instrument);
        this.openInstrument = this.instrument;
    }
    quickStyles(style) {
        switch (style) {
            case "dark": {
                this.styling = {
                    body: {
                        backgroundColor: "#4f3d39",
                        font: "14px Arial",
                        color: "#bfb9b9"
                    },
                    button: {
                        font: "14 px Arial",
                        backgroundColor: "#3da973",
                        color: "#1c1c1c"
                    },
                    label: {
                        font: "14 px Arial",
                        color: "#1c1c1c"
                    }
                }
                break;
            }
            case "standard": {
                this.styling = {
                    body: {
                        font: "14px Arial, Verdana, Helvetica, sans-serif",
                        color: "#919aa1",
                        backgroundColor: "#FFFFFF"
                    },
                    button: {
                        backgroundColor: "#ee7023",
                        color: "#FFFFFF"
                    },
                    label: {
                        color: "#72605e"
                    }
                };
                break;
            }
        }
        this.iframeUpdate();
    }
    paymentComplete() {
        console.log("Payment completed.");
    }
    setInstrument(instrument, method, container = {}) {
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay(container)[method];
                break;
            }
            case "consumers": {
                payex.hostedView.consumer(container)[method];
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount(container)[method];
                break;
            }
            case "creditcardv2":
            case "creditcardv3": {
                payex.hostedView.creditCard(container)[method];
                break;
            }
            case "invoice": {
                payex.hostedView.invoice(container)[method];
                break;
            }
            case "mobilepay": {
                payex.hostedView.mobilepay(container)[method];
                break;
            }
            case "payment":
            case "paymentmenu": {
                payex.hostedView.paymentMenu(container)[method];
                break;
            }
            case "swish": {
                payex.hostedView.swish(container)[method];
                break;
            }
            case "trustly": {
                payex.hostedView.trustly(container)[method];
                break;
            }
            case "vipps": {
                payex.hostedView.vipps(container)[method];
                break;
            }
            default: {
                console.log("failed to find instrument");
            }
        }
    }
}