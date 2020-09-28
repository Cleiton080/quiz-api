# Quiz API

I have been learning some technologies now, then I decided to began this simple project where I can practice my programming abilities. The endpoint is going to be written using ExpressJS and I am going to be using a relational database, Mysql. The Use Case is folowing down.

## Use Case

### Sign-up

__Description:__

All the users have to have an account in order to access the system. 

__Request:__

_Post /auth/signup_

    {
	    username: "name",
        email: "email",
		password: "password",
		profile_picture: "picture"
    }

__Parameters:__

+ username: required, string
+ email: required, email, unique
+ password: required, string
+ profile_picture: url
  
__Responses:__

    201 - Created.
	200 - OK.
	400 - Bad Request.
    500 - Server Error.

### Login

__Description:__

After the users’ account has been set up, they can use their credentials to sign in the system.

__Request:__

_Post /auth/login_

    {
        email: "email",
		password: "password"
    }

__Parameters:__

+ email: required, email
+ password: required, string

__Responses:__
    
    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

If everything goes right the server will return a json:

    { "token": "hash" }
