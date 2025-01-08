"use strict";
class PaymentAPI {
    constructor() {
        this.paymentDetails = [{ id: 0, sum: 1000000 }];
    }
    getPaymentDetails(id) {
        return this.paymentDetails.find(d => d.id === id);
    }
}
class ProxyAccessorPaymentAPI {
    constructor(api, userID) {
        this.api = api;
        this.userID = userID;
    }
    getPaymentDetails(id) {
        if (this.userID === 'uqhbxw_wid1234/%gg')
            return this.api.getPaymentDetails(id);
        console.log('There was trying to get payment details!');
        return undefined;
    }
}
const proxyAPI = new ProxyAccessorPaymentAPI(new PaymentAPI(), 'uqhbxw_wid1234/%gg');
proxyAPI.getPaymentDetails(0);
console.log(proxyAPI.getPaymentDetails(0));
