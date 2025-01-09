"use strict";
class AbstractMiddleware {
    next(mid) {
        this.nextMiddleware = mid;
        return mid;
    }
    handle(request) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        console.log('Change calling sequence!');
    }
}
class AuthMiddleware extends AbstractMiddleware {
    handle(req) {
        console.log('Auth middleware');
        if (req.userId === 1) {
            return super.handle(req);
        }
        console.log('You do not pass the auth!');
    }
}
class ValidateMiddleware extends AbstractMiddleware {
    handle(req) {
        console.log('Validate middleware');
        if (req.body) {
            return super.handle(req);
        }
        console.log('Your request do not have the body!');
    }
}
class Controller extends AbstractMiddleware {
    handle(req) {
        console.log('Controller!!!Success');
        return req;
    }
}
const auth = new AuthMiddleware();
const valid = new ValidateMiddleware();
const controller = new Controller();
auth.next(valid).next(controller);
auth.handle({ userId: 1, body: {} });
