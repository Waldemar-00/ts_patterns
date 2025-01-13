"use strict";
class TextDocument {
    constructor(text, status) {
        this.text = text;
        this.status = status;
        this.status.setDocument(this);
        this.text = text;
    }
    getState() {
        return this.status;
    }
    setStatus(state) {
        this.status = state;
        this.status.setDocument(this);
    }
    publish() {
        this.status.publish();
    }
    unPublish() {
        this.status.unPublish();
    }
}
class AbstractStatus {
    setDocument(document) { this.document = document; } //! set concrete document
}
class DraftStatus extends AbstractStatus {
    constructor() {
        super();
        this.nameOfState = 'DraftStatus';
    }
    publish() {
        console.log(`Has sended the text to the site: ${this.document.text}`);
        const publishStatus = new PublishStatus();
        publishStatus.setDocument(this.document);
        this.document.setStatus(publishStatus);
    }
    unPublish() {
        console.log(`Has deleted the text from the site: ${this.document.text}`);
    }
}
class PublishStatus extends AbstractStatus {
    constructor() {
        super();
        this.nameOfState = 'PublishStatus';
    }
    publish() {
        console.log(`Your status is ${this.nameOfState}! So, you can not publish the published text!`);
    }
    unPublish() {
        console.log(`The text has retired!`);
    }
}
const document_1 = new TextDocument('My ARTICLE', new DraftStatus());
document_1.text = 'My ARTICLE';
console.log(document_1.getState());
document_1.publish();
console.log(document_1.getState());
document_1.publish();
document_1.unPublish();
console.log(document_1.getState());
