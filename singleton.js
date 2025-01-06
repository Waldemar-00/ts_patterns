"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _Singleton_instance;
class Singleton {
    constructor() {
        this.dmap = new Map();
    } //! NO - new Singleton()
    static getInstance() {
        if (!__classPrivateFieldGet(_a, _a, "f", _Singleton_instance)) {
            console.log('Created Instance');
            __classPrivateFieldSet(_a, _a, new _a(), "f", _Singleton_instance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Singleton_instance);
    }
}
_a = Singleton;
_Singleton_instance = { value: void 0 };
const myMap = Singleton.getInstance().dmap.set(1, 'Singleton instance');
console.log(myMap);
class Service_1 {
    addToSingletonMap(key, value) {
        Singleton.getInstance().dmap.set(key, value);
    }
}
class Service_2 {
    getByKeyFromSingletonMap(key) {
        console.log(Singleton.getInstance().dmap.get(key));
    }
}
new Service_1().addToSingletonMap(0, "Singleton is working");
new Service_2().getByKeyFromSingletonMap(1);
new Service_2().getByKeyFromSingletonMap(0); //! The same Map!
