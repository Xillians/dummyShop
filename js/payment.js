class Payment {
    constructor(url, styling) {
        if (url == undefined)
            url = "";
        if (styling == undefined)
            styling = "";

        this.url = url;
        this.styling = styling;
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

    async generatePayment(instrument) {
        var requests = new Requests();

        switch (instrument) {
            case "carpay": {
                var hvUrl = await requests.createCarPayPayment();
                break;
            }
            case "creditaccount": {
                var hvUrl = await this.createCreditAccountPayment();
                break;
            }
            case "creditcard": {
                var hvUrl = await requests.createCcPayment();
                break;
            }
            case "invoice": {
                var hvUrl = await this.createInvoicePayment();
                break;
            }
            case "paymentmenu": {
                var hvUrl = await this.createPaymentOrder();
                break;
            }
            case "swish": {
                var hvUrl = await this.createSwishPayment();
                break;
            }
            case "vipps": {
                var hvUrl = await this.vipps();
                break;
            }
        }
        $("#hvUrl").val(hvUrl);
        this.applyStyling();
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

    kickit() {
        var urlSplit = this.url.split("/");
        var instrument = urlSplit[3];
        if (this.openInstrument != undefined)
            this.iframeClose(instrument)

        this.iframeOpen(instrument);
        this.openInstrument = instrument;
    }

    iframeClose(instrument) {
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay().close();
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
            case "vipps": {
                payex.hostedView.vipps().close();
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps().close();
                break;
            }
            case "consumers": {
                payex.hostedView.consumer().close();
                break;
            }
            default: {
                console.log("Failed to close");
            }
        }
    }

    iframeOpen(instrument) {
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "creditcardv2": {
                payex.hostedView.creditCard({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "invoice": {
                payex.hostedView.invoice({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "paymentmenu": {
                payex.hostedView.paymentMenu({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "swish": {
                payex.hostedView.swish({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "vipps": {
                payex.hostedView.vipps({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            case "consumers": {
                payex.hostedView.consumer({
                    container: 'payment-container',
                    style: this.styling
                }).open();
                break;
            }
            default: {
                console.log("Failed to open");
            }
        }
    }

    iframeUpdate() {
        switch (instrument) {
            case "carpay": {
                payex.hostedView.carPay().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    }
                );
                break;
            }
            case "creditaccount": {
                payex.hostedView.creditAccount().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "creditcardv2": {
                payex.hostedView.creditCard().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "invoice": {
                payex.hostedView.invoice().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "paymentmenu": {
                payex.hostedView.paymentMenu().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "swish": {
                payex.hostedView.swish().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "vipps": {
                payex.hostedView.vipps().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "vippsv2": {
                payex.hostedView.vipps().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            case "consumers": {
                payex.hostedView.consumer().update(
                    {
                        container: 'payment-container',
                        style: this.styling
                    });
                break;
            }
            default: {
                console.log("Failed to update");
            }
        }
    }

    // Styles under here
    sillyStyle() {
        this.styling = payex.hostedView.creditCard().update({
            container: 'pxhv',
            style: {
                body: {
                    backgroundColor: "#7FFFD4",
                    font: "14px Comic Sans MS",
                    color: "#ff69b4"
                },
                button: {
                    font: "14 px Comic Sans",
                    backgroundColor: "#FFFF00",
                    color: "#ff69b4"
                },
                label: {
                    font: "14 px Comic Sans ",
                    color: "#8C15D4"
                }
            }
        });
    }
}