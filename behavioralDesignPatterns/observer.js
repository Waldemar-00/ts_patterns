"use strict";
class Lead {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
    }
}
class StoreOfObservers {
    constructor() {
        this.observers = [];
    }
    attach(observer) {
        if (this.observers.includes(observer)) {
            console.log('The same observer is already attached to the store!');
            return;
        }
        this.observers.push(observer);
        this.notify(observer, "ATTACHED");
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            this.notify(observer, 'DETACH');
            return;
        }
        console.log('Did not find the observer!');
    }
    notify(observer, message) {
        observer.update(observer, message);
    }
}
class NotifyService {
    update(subject, message) {
        console.log(`NotifyService Got a notification! ${message}`);
        console.log(subject);
    }
}
class LeadService {
    update(subject, message) {
        console.log(`LeadService Got a notification! ${message}`);
        console.log(subject);
    }
}
const store = new StoreOfObservers();
store.lead = new Lead('ULADZIMIR', '+49789343537');
const serviceOfLead = new LeadService();
const serviceOfNotify = new NotifyService();
store.attach(serviceOfLead);
store.attach(serviceOfLead);
store.detach(serviceOfNotify);
console.log(store);
store.attach(serviceOfNotify);
console.log(store);
store.detach(serviceOfLead);
console.log(store);
