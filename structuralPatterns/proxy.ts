interface IPaymentDetails
{
    id: number
    sum: number
}
interface IPaymentAPI
{
    getPaymentDetails( id: number ): IPaymentDetails | undefined
}

class PaymentAPI implements IPaymentAPI
{
    private paymentDetails: IPaymentDetails[] = [ { id: 0, sum: 1000_000 } ]
    getPaymentDetails (id: number): IPaymentDetails | undefined
    {
        return this.paymentDetails.find(d => d.id === id)
    }
}

class ProxyAccessorPaymentAPI implements IPaymentAPI {
    constructor ( private api: PaymentAPI, private userID: string ) { }
    getPaymentDetails ( id: number ): IPaymentDetails | undefined
    {
        if ( this.userID === 'uqhbxw_wid1234/%gg' ) return this.api.getPaymentDetails( id )
        console.log( 'There was trying to get payment details!' )
        return undefined
    }
}

const proxyAPI = new ProxyAccessorPaymentAPI( new PaymentAPI(), 'uqhbxw_wid1234/%gg' )

proxyAPI.getPaymentDetails( 0 )
console.log( proxyAPI.getPaymentDetails( 0 ) )
