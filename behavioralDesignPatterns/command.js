"use strict";
class UserService {
    saveUserAndLog(user) {
        //* save some user
        console.log(`Saving user with ID: ${user.userID}`);
    }
    deleteUserAndLog(userID) {
        //* delete some user
        console.log(`Deleting user with ID: ${userID}`);
    }
}
class User {
    // name: string
    // email: string
    constructor(userID) {
        this.userID = userID;
    }
}
class HistoryOfCommands {
    constructor() {
        this.commands = [];
    }
    pushCommand(command) {
        this.commands.push(command);
    }
    deleteCommand(command) {
        this.commands = this.commands.filter(c => c.commandID !== command.commandID);
    }
}
class Command {
    constructor(history) {
        this.history = history;
        this.commandID = (Math.floor(Math.random() * 1000));
    }
}
class UserCommands extends Command {
    //* commandID: number = ( Math.floor( Math.random() * 1000 ) )
    constructor(user, userService, history) {
        super(history);
        this.user = user;
        this.userService = userService;
    }
    execute() {
        this.userService.saveUserAndLog(this.user);
        this.history.pushCommand(this);
    }
    undo() {
        var _a;
        (_a = this.userService) === null || _a === void 0 ? void 0 : _a.deleteUserAndLog(this.user.userID);
        this.history.deleteCommand(this);
    }
}
class CommandController {
    constructor(userService, user, history) {
        this.userService = userService;
        this.user = user;
        this.history = history;
        this.userService = userService;
        this.history = history;
        this.user = user;
    }
    run() {
        const userCommands = new UserCommands(this.user, this.userService, this.history);
        userCommands.execute();
        console.log(userCommands.history);
        userCommands.undo();
        console.log(userCommands.history);
    }
}
const userController = new CommandController(new UserService(), new User(0), new HistoryOfCommands());
userController.run();
