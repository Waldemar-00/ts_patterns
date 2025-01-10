interface IMediator
{
    notify(sender: string, event: string): void
}

// class Mediator implements IMediator
// {
//     notify ( sender: string, event: string ): void { }
// }

class Auth
{
    static #pass: string = "wuqyhdb_198293/787gf"
    auth (password: string ): string
    {
        return Auth.#pass === password ? 'Auth is Success!' : 'Auth is Failure!'
    }
}

class Logger
{
    logger (message: string)
    {
        console.log(message)
    }
}

class ConcreteMediator implements IMediator
{
    private auth: string
    private logger: Function
    constructor ( auth: string, logger: Function )
    {
        this.auth = auth
        this.logger = logger
    }
    notify()
    {
       this.logger( this.auth )
    }
}

const concreteMediator = new ConcreteMediator( new Auth().auth( "wuqyhdb_198293/787gf" ), new Logger().logger )
concreteMediator.notify()
//!_________________________________________________________________________

interface IMediator
{
    notify(sender: string, event: string): void
}

abstract class Abstract
{
    mediator!: IMediator
    setMediator ( mediator: IMediator )
    {
        this.mediator = mediator
    }
}
class StartMessage
{
    send ()
    {
        console.log('Sending message...')
    }
}

class LogMessage
{
    log ( message: string ): void
    {
        console.log(message)
    }
}

class Handler extends Abstract
{
    myEvent ()
    {
        this.mediator.notify('EventHandler', 'myEvent')
    }
}

class NotificationMediator implements IMediator
{
    constructor
        (
        public notifications: StartMessage,
        public logger: LogMessage,
        // public handler: EventHandler
    ) { }
    notify(sender: string, event: string): void
    {
       switch (event) {
        case 'myEvent':
               this.notifications.send()
               this.logger.log(`${sender} sended successfully!`)
            break;

        default:
            break;
       }
    }
}


const mediator = new NotificationMediator( new StartMessage(), new LogMessage() )

const handler = new Handler()
handler.setMediator( mediator )
handler.myEvent()