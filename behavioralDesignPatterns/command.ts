class UserService
{
    saveUserAndLog (user: User): void
    {
        //* save some user
        console.log( `Saving user with ID: ${ user.userID }` )
    }
    deleteUserAndLog ( userID: number ): void
    {
        //* delete some user
        console.log(`Deleting user with ID: ${ userID }`)
    }
}

class User
{
    // name: string
    // email: string
    constructor(public userID: number) {}
}

class HistoryOfCommands
{
    commands: Command[] = []
    pushCommand (command: Command): void
    {
       this.commands.push(command)
    }
    deleteCommand ( command: Command ): void
    {
        this.commands = this.commands.filter( c => c.commandID !== command.commandID )
    }
}

abstract class Command
{
    commandID: number = ( Math.floor( Math.random() * 1000 ) )
    constructor ( public history: HistoryOfCommands ) { }
    abstract execute(): void
    abstract undo(): void
}


class UserCommands extends Command
{
    //* commandID: number = ( Math.floor( Math.random() * 1000 ) )

    constructor (
        private user: User,
        private userService: UserService,
        history: HistoryOfCommands
    )
    {
        super( history )
    }
    execute (): void
    {
        this.userService.saveUserAndLog( this.user )
        this.history.pushCommand( this )

    }
    undo (): void
    {
        this.userService?.deleteUserAndLog( this.user.userID )
        this.history.deleteCommand( this )
    }
}



class CommandController
{
    constructor ( private userService: UserService, private user: User , public history: HistoryOfCommands )
    {
        this.userService = userService
        this.history = history
        this.user = user
    }
    run (): void
    {
        const userCommands = new UserCommands( this.user, this.userService, this.history )
        userCommands.execute()
        console.log( userCommands.history )
        userCommands.undo()
        console.log( userCommands.history )
    }
}

const userController = new CommandController( new UserService(), new User( 0 ), new HistoryOfCommands() )
userController.run()