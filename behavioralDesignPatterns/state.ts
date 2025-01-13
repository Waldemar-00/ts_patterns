class TextDocument
{
    private status!: AbstractStatus
    constructor (public text: string, status: AbstractStatus) {
        this.status = status
        this.status.setDocument( this )
        this.text = text
    }
    getState (): AbstractStatus
    {
        return this.status
    }
    setStatus ( state: AbstractStatus): void
    {
        this.status = state
        this.status.setDocument(this)
    }
    publish ()
    {
        this.status.publish()
    }
    unPublish ()
    {
        this.status.unPublish()
    }
}

abstract class AbstractStatus
{
    public nameOfState!: string
    public document!: TextDocument // Убираем создание нового экземпляра

    public setDocument ( document: TextDocument ) { this.document = document } //! set concrete document

    public abstract publish (): void
    public abstract unPublish(): void
}

class DraftStatus extends AbstractStatus
{
    constructor ()
    {
        super()
        this.nameOfState = 'DraftStatus'
    }
    publish ()
    {
        console.log(`Has sended the text to the site: ${this.document.text}`)
        const publishStatus = new PublishStatus()
        publishStatus.setDocument( this.document )
        this.document.setStatus( publishStatus )
    }
    unPublish ()
    {
        console.log(`Has deleted the text from the site: ${this.document.text}`)
    }
}

class PublishStatus extends AbstractStatus
{
    constructor ()
    {
        super()
        this.nameOfState = 'PublishStatus'
    }
    publish ()
    {
        console.log(`Your status is ${ this.nameOfState }! So, you can not publish the published text!`)
    }
    unPublish ()
    {
        console.log(`The text has retired!`)
    }
}

const document_1 = new TextDocument('My ARTICLE', new DraftStatus())
document_1.text = 'My ARTICLE'
console.log( document_1.getState() )
document_1.publish()
console.log( document_1.getState() )
document_1.publish()
document_1.unPublish()
console.log( document_1.getState() )
