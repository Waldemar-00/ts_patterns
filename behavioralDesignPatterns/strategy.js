"use strict";
class UserStrategy {
    constructor(token) {
        if (token.includes('git')) {
            this.gitHubToken = token;
        }
        else
            this.jwtToken = token;
    }
}
class AuthStrategy {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) { this.strategy = strategy; }
    authUser(user) {
        return this.strategy.auth(user);
    }
}
class JWTStrategy {
    auth(user) {
        return user.jwtToken ? true : false;
    }
}
class gitHubStrategy {
    auth(user) {
        return user.gitHubToken ? true : false;
    }
}
const authentiction = new AuthStrategy(new JWTStrategy());
console.log(authentiction.authUser(new UserStrategy('git')));
authentiction.setStrategy(new gitHubStrategy());
console.log(authentiction.authUser(new UserStrategy('git')));
