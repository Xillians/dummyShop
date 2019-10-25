class Payment {
    constructor(url, styling) {
        if (url == undefined)
            url = "";
        if (styling == undefined)
            styling = {};

        this.url = url;
        this.styling = styling;
    }

    applyStyling() {
        var inputLink = $("#hvUrl").val();
        var styling = $("#style").val();
        this.url = inputLink;
        this.styling = styling;
        this.injectScript(this.url).then(() => {
            console.log("Successfully loaded script!");
        }).catch(error => {
            console.log(error);
        });
    }

    kickit() {
        var urlSplit = this.url.split("/");
        var instrument = urlSplit[3];
        this.openiframe(instrument);
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

    openiframe(instrument) {
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
}

