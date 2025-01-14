interface IForm
{
    name: string
    url: string
    method?: 'POST'
    body?: Object
}
class Form
{
    constructor ( public name: string ) { }
}

abstract class Process
{
    process (form: Form) //! Template Method
    {
        this.log()
        this.fillForm( form )
        this.send()

    }
    protected abstract log (): void
    protected abstract fillForm ( form: Form ): IForm
    protected abstract send(): void
}

class API_get extends Process
{
    private _URL: string = 'https://jsonplaceholder.typicode.com/users/1'
    private modForm!: IForm
    constructor ( public form: Form )
    {
        super()
        this.form = form
    }
    log (): void
    {
        console.log( this.form.name )
    }
    fillForm ( form: Form ): IForm
    {
        const modifier: IForm = { name: form.name, url: this._URL }
        this.modForm = modifier
        return modifier
    }
    async send (): Promise<void>
    {
        await fetch( this.modForm.url ).then( res => res.json() ).then( res => console.log( res ) )
    }

}

class API_post extends Process
{
    private _URL: string = 'https://jsonplaceholder.typicode.com/posts'
    private method: "POST" = "POST"
    private modForm!: IForm
    constructor ( public form: Form, public body: Object )
    {
        super()
        this.form = form
    }
    log (): void
    {
        console.log( this.form.name )
    }
    fillForm ( form: Form ): IForm
    {
        const modifier: IForm = { name: form.name, url: this._URL, method: this.method, body: this.body }
        this.modForm = modifier
        return modifier
    }
    async send (): Promise<void>
    {
        await fetch( this.modForm.url, {
            method: this.modForm.method,
            body: JSON.stringify( this.modForm.body )
        } ).then( res => res.json() ).then( res => console.log( res ) )
    }

}
const api_get = new API_get( new Form( 'GETTING' ) )
api_get.process( api_get.form )

const api_post = new API_post( new Form( 'POSTING' ), { user: 'Somebody' } )
console.log( api_post.fillForm( new Form( 'POSTING' ) ) )
api_post.process( api_post.form )