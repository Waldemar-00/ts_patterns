interface Prototype<T>
{
    clone(): T
}

class UserHistory implements Prototype<UserHistory>
{
    createdAt: Date =  new Date()
    constructor ( public name: string, public email: string ) { }

    clone (): UserHistory
    {
        const clone = new UserHistory( this.name, this.email )
        clone.createdAt = this.createdAt
        return clone
    }
}

const uhistory = new UserHistory( 'John', 'some@jd.com' )
console.log( uhistory )

const uhistoryClone = uhistory.clone()
console.log( uhistoryClone )

uhistoryClone.email = "EXAMPLE@EX.COM"

console.log( uhistory )
console.log( uhistoryClone )
