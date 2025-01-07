class Template
{
    private templates = [ { name: 'Someone', template: '<h1>Template</h1>' } ]
    getByName ( name: string )
    {
        return this.templates.find( t => t.name === name)
    }
}

class Notify
{
    send ( template: string, to: string ): string
    {
        return `Sending...${template} to ${to}`
    }
}

class Log
{
    log(message: string, template: string): void { console.log(`${message}: ${template}`) }
}
class NotificationFacade
{
    log: Log
    notify: Notify
    template: Template
    constructor ()
    {
        this.log = new Log()
        this.notify = new Notify()
        this.template = new Template()
    }
    send ( templateName: string, to: string )
    {
        const template = this.template.getByName( templateName )
        if ( !template )
        {
            console.log('The template was not found!')
        } else
        {
            const name = template?.name
            const templ = template?.template
            const message = this.notify.send( name, to )
            this.log.log( message, templ)
        }
    }
}

const nFacade = new NotificationFacade()

nFacade.send('Someone', 'Jora')