"use strict";
class TelegramProvider {
    sendMessage(mess) { console.log(mess); }
    connect(config) { console.log(config); }
    disconnect() { console.log('Disconnecting...Telegram'); }
}
class WhatsUpProvider {
    sendMessage(mess) { console.log(mess); }
    connect(config) { console.log(config); }
    disconnect() { console.log('Disconnecting...WhatsUp'); }
}
class NotificationSender {
    constructor(provider) {
        this.provider = provider;
    }
    send() {
        this.provider.connect('connect');
        this.provider.sendMessage('Message');
        this.provider.disconnect();
    }
}
class DelayNotificationSender extends NotificationSender {
    constructor(provider) {
        super(provider);
    }
    delaySending() {
        setTimeout(() => {
            this.send();
        }, 3000);
    }
}
const sender = new NotificationSender(new WhatsUpProvider());
sender.send();
const delaySender = new DelayNotificationSender(new TelegramProvider());
delaySender.delaySending();
