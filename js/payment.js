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
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay().close();
                break;
            }
            case "consumers": {
                payex.hostedView.consumer().close();
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount().close();
                break;
            }
            case "creditcardv2": {
                payex.hostedView.creditCard().close();
                break;
            }
            case "invoice": {
                payex.hostedView.invoice().close();
                break;
            }
            case "paymentmenu": {
                payex.hostedView.paymentMenu().close();
                break;
            }
            case "swish": {
                payex.hostedView.swish().close();
                break;
            }
            case "trustly": {
                payex.hostedView.trustly().close();
                break;
            }
            case "vipps": {
                payex.hostedView.vipps().close();
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps().close();
                break;
            }
            default: {
                console.log("Failed to close");
            }
        }
    }

    iframeOpen(instrument) {
        var container = {
            container: 'payment-container',
            // onPaymentCompleted:  () => { this.paymentComplete() },
            style: this.styling
        };
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay(container).open();
                break;
            }
            case "consumers": {
                payex.hostedView.consumer(container).open();
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount(container).open();
                break;
            }
            case "creditcardv2": {
                payex.hostedView.creditCard(container).open();
                break;
            }
            case "invoice": {
                payex.hostedView.invoice(container).open();
                break;
            }
            case "paymentmenu": {
                payex.hostedView.paymentMenu(container).open();
                break;
            }
            case "swish": {
                payex.hostedView.swish(container).open();
                break;
            }
            case "trustly": {
                payex.hostedView.trustly(container).open();
                break;
            }
            case "vipps": {
                payex.hostedView.vipps(container).open();
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps(container).open();
                break;
            }
            default: {
                console.log("Failed to open");
            }
        }
    }

    iframeUpdate() {
        var container = {
            container: 'payment-container',
            // onPaymentCompleted:  () => { this.paymentComplete() },
            style: this.styling
        };
        switch (this.instrument) {
            case "carpay": {
                payex.hostedView.carPay().update(container);
                break;
            }
            case "consumers": {
                payex.hostedView.consumer().update(container);
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount().update(container);
                break;
            }
            case "creditcardv2": {               
                payex.hostedView.creditCard().update(container);
                break;
            }
            case "invoice": {
                payex.hostedView.invoice().update(container);
                break;
            }
            case "paymentmenu": {
                payex.hostedView.paymentMenu().update(container);
                break;
            }
            case "swish": {
                payex.hostedView.swish().update(container);
                break;
            }
            case "trustly": {
                payex.hostedView.trustly(container).update();
                break;
            }
            case "vipps": {
                payex.hostedView.vipps().update(container);
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps().update(container);
                break;
            }
            default: {
                console.log("Failed to update");
            }
        }
    }

    kickit() {
        var urlSplit = this.url.split("/");
        this.instrument = urlSplit[3];
        
        if(this.openInstrument != undefined)
            this.iframeClose(this.instrument);

        this.iframeOpen(this.instrument);
        this.openInstrument = this.instrument;
    }

    quickStyles(style) {
        switch(style) {
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
        console.log("SUCCESS!");        
    }
}