interface ISubject
{
    attach ( observer: IObserver ): void
    detach ( observer: IObserver ): void
    notify( observer: IObserver, message: string ): void
}

interface IObserver
{
    update(subject: IObserver, message: string): void
}

class Lead
{
    constructor(public name: string, public phone: string) {}
}

class StoreOfObservers implements ISubject
{
    private observers: IObserver[] = []
    public lead!: Lead
    attach ( observer: IObserver ): void
    {
        if ( this.observers.includes( observer ) )
        {
            console.log('The same observer is already attached to the store!')
            return
        }
        this.observers.push( observer )
        this.notify(observer, "ATTACHED")
    }
    detach ( observer: IObserver ): void
    {
        const index = this.observers.indexOf( observer )
        if ( index > -1 )
        {
            this.observers.splice( index, 1 )
            this.notify( observer, 'DETACH' )
            return
        }
        console.log('Did not find the observer!')
    }
    notify (observer: IObserver, message: string): void
    {
        observer.update(observer, message)
    }

}

class NotifyService implements IObserver
{
    update ( subject: IObserver, message: string): void
    {
        console.log( `NotifyService Got a notification! ${ message }` )
        console.log( subject )
    }

}

class LeadService implements IObserver
{
    update ( subject: IObserver, message: string ): void
    {
        console.log( `LeadService Got a notification! ${ message }` )
        console.log( subject )
    }

}

const store = new StoreOfObservers()

store.lead = new Lead( 'ULADZIMIR', '+49789343537' )

const serviceOfLead = new LeadService()

const serviceOfNotify = new NotifyService()

store.attach( serviceOfLead )
store.attach( serviceOfLead )
store.detach( serviceOfNotify )
console.log( store )
store.attach( serviceOfNotify )
console.log( store )
store.detach( serviceOfLead )
console.log( store )