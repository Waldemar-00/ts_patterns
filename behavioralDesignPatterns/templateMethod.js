"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Form {
    constructor(name) {
        this.name = name;
    }
}
class Process {
    process(form) {
        this.log();
        this.fillForm(form);
        this.send();
    }
}
class API_get extends Process {
    constructor(form) {
        super();
        this.form = form;
        this._URL = 'https://jsonplaceholder.typicode.com/users/1';
        this.form = form;
    }
    log() {
        console.log(this.form.name);
    }
    fillForm(form) {
        const modifier = { name: form.name, url: this._URL };
        this.modForm = modifier;
        return modifier;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(this.modForm.url).then(res => res.json()).then(res => console.log(res));
        });
    }
}
class API_post extends Process {
    constructor(form, body) {
        super();
        this.form = form;
        this.body = body;
        this._URL = 'https://jsonplaceholder.typicode.com/posts';
        this.method = "POST";
        this.form = form;
    }
    log() {
        console.log(this.form.name);
    }
    fillForm(form) {
        const modifier = { name: form.name, url: this._URL, method: this.method, body: this.body };
        this.modForm = modifier;
        return modifier;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fetch(this.modForm.url, {
                method: this.modForm.method,
                body: JSON.stringify(this.modForm.body)
            }).then(res => res.json()).then(res => console.log(res));
        });
    }
}
const api_get = new API_get(new Form('GETTING'));
api_get.process(api_get.form);
const api_post = new API_post(new Form('POSTING'), { user: 'Somebody' });
console.log(api_post.fillForm(new Form('POSTING')));
api_post.process(api_post.form);
