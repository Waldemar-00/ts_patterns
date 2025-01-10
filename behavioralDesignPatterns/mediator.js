"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Auth_pass;
// class Mediator implements IMediator
// {
//     notify ( sender: string, event: string ): void { }
// }
class Auth {
    auth(password) {
        return __classPrivateFieldGet(_a, _a, "f", _Auth_pass) === password ? 'Auth is Success!' : 'Auth is Failure!';
    }
}
_a = Auth;
_Auth_pass = { value: "wuqyhdb_198293/787gf" };
class Logger {
    logger(message) {
        console.log(message);
    }
}
class ConcreteMediator {
    constructor(auth, logger) {
        this.auth = auth;
        this.logger = logger;
    }
    notify() {
        this.logger(this.auth);
    }
}
const concreteMediator = new ConcreteMediator(new Auth().auth("wuqyhdb_198293/787gf"), new Logger().logger);
concreteMediator.notify();
class Abstract {
    setMediator(mediator) {
        this.mediator = mediator;
    }
}
class StartMessage {
    send() {
        console.log('Sending message...');
    }
}
class LogMessage {
    log(message) {
        console.log(message);
    }
}
class Handler extends Abstract {
    myEvent() {
        this.mediator.notify('EventHandler', 'myEvent');
    }
}
class NotificationMediator {
    constructor(notifications, logger) {
        this.notifications = notifications;
        this.logger = logger;
    }
    notify(sender, event) {
        switch (event) {
            case 'myEvent':
                this.notifications.send();
                this.logger.log(`${sender} sended successfully!`);
                break;
            default:
                break;
        }
    }
}
const mediator = new NotificationMediator(new StartMessage(), new LogMessage());
const handler = new Handler();
handler.setMediator(mediator);
handler.myEvent();
