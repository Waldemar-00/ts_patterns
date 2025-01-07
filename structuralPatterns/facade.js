"use strict";
class Template {
    constructor() {
        this.templates = [{ name: 'Someone', template: '<h1>Template</h1>' }];
    }
    getByName(name) {
        return this.templates.find(t => t.name === name);
    }
}
class Notify {
    send(template, to) {
        return `Sending...${template} to ${to}`;
    }
}
class Log {
    log(message, template) { console.log(`${message}: ${template}`); }
}
class NotificationFacade {
    constructor() {
        this.log = new Log();
        this.notify = new Notify();
        this.template = new Template();
    }
    send(templateName, to) {
        const template = this.template.getByName(templateName);
        if (!template) {
            console.log('The template was not found!');
        }
        else {
            const name = template === null || template === void 0 ? void 0 : template.name;
            const templ = template === null || template === void 0 ? void 0 : template.template;
            const message = this.notify.send(name, to);
            this.log.log(message, templ);
        }
    }
}
const nFacade = new NotificationFacade();
nFacade.send('Someone', 'Jora');
