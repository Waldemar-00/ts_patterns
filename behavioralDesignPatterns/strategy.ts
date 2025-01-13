type Token = 'git' | 'jwt'
class UserStrategy
{
    gitHubToken!: string
    jwtToken!: string
    constructor ( token: Token )
    {
        if ( token.includes('git') )
        {
            this.gitHubToken = token
        } else this.jwtToken = token
    }
}

interface Strategy
{
    auth ( user: UserStrategy ): boolean
}

class AuthStrategy
{
    constructor ( private strategy: Strategy ) { }
    setStrategy ( strategy: Strategy ) { this.strategy = strategy }

    public authUser ( user: UserStrategy ): boolean
    {
        return this.strategy.auth( user )
    }
}

class JWTStrategy implements Strategy
{
    auth (user: UserStrategy ): boolean
    {
        return user.jwtToken ? true : false
    }
}

class gitHubStrategy implements Strategy
{
    auth (user: UserStrategy ): boolean
    {
        return user.gitHubToken ? true : false
    }
}

const authentiction = new AuthStrategy( new JWTStrategy() )
console.log( authentiction.authUser( new UserStrategy( 'git' ) ) )
authentiction.setStrategy( new gitHubStrategy() )
console.log( authentiction.authUser( new UserStrategy( 'git' ) ) )
