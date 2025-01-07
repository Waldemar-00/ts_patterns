interface IProvider
{
    sendMessage ( mess: string ): void
    connect  ( config: unknown ): void
    disconnect(): void
}

class TelegramProvider implements IProvider
{
    sendMessage ( mess: string ): void {console.log(mess)}
    connect  ( config: string ): void {console.log(config)}
    disconnect(): void {console.log('Disconnecting...Telegram')}
}

class WhatsUpProvider implements IProvider
{
    sendMessage ( mess: string ): void {console.log(mess)}
    connect  ( config: string): void {console.log(config)}
    disconnect(): void {console.log('Disconnecting...WhatsUp')}
}

class NotificationSender {             //! ____________ BRIDGE
    constructor ( private provider: IProvider ) { }

    send ()
    {
        this.provider.connect( 'connect' )
        this.provider.sendMessage( 'Message' )
        this.provider.disconnect()
    }
}

class DelayNotificationSender extends NotificationSender
{
    constructor ( provider: IProvider )
    {
        super( provider )
    }
    delaySending ()
    {
        setTimeout( () =>
        {
           this.send()
        }, 3000 )
    }
}

const sender = new NotificationSender( new WhatsUpProvider() )
sender.send()
const delaySender = new DelayNotificationSender( new TelegramProvider() )
delaySender.delaySending()