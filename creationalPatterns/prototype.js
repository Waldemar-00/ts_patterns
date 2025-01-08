"use strict";
class UserHistory {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }
    clone() {
        const clone = new UserHistory(this.name, this.email);
        clone.createdAt = this.createdAt;
        return clone;
    }
}
const uhistory = new UserHistory('John', 'some@jd.com');
console.log(uhistory);
const uhistoryClone = uhistory.clone();
console.log(uhistoryClone);
uhistoryClone.email = "EXAMPLE@EX.COM";
console.log(uhistory);
console.log(uhistoryClone);
