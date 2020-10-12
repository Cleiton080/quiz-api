# Quiz API

I have been learning some technologies now, then I decided to began this simple project where I can practice my programming abilities. The endpoint is going to be written using ExpressJS and I am going to be using a relational database, Mysql. 

The Use Case is down below:

## Use Case

### Sign-up

__Description:__

All the users have to have an account in order to access the system. 

__Request:__

_Post /auth/signup_

    {
	    "username": "name",
        "email": "email",
		"password": "password",
		"profilePicture": "picture"
    }

__Parameters:__

+ username: required, string
+ email: required, email, unique
+ password: required, string
+ profilePicture: url
  
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
        "email": "exemple@email.com",
		"password": "password"
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

### Fetch the quizzes by the authenticated user

__Description:__

It's going to return all the quizzes which the authenticated user are related with.

__Request:__

_Get /quiz_

__Headers__

+ _x-access-token: Bearer "add the token here"_

__Responses:__
    
    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

### Create a quiz

__Description:__

A authenticated user should be able to easily create a quiz.

__Request:__

_Post /quiz_

    {
        "title": "quiz example",
		"questions": [
            {
                "question": "is this question right?",
                "alternatives": [
                    {
                        "alternative": "yes"
                    },
                    {
                        "alternative": "no"
                    }
                ]
            }
        ]
    }

__Parameters:__

+ title: required, string
+ questions: array
+ question: required, string
+ alternatives: required, array

__Headers__

+ _x-access-token: Bearer "add the token here"_

__Responses:__
    
    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

### Delete a quiz by its ID

__Description:__

The quiz should be deleted as such all its information related with.

__Request__

_Delete /quiz_

    { quiz: 364 }

__Parameters:__

+ quiz: required, number

__Headers__

+ _x-access-token: Bearer "add the token here"_

__Responses:__

    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

### Fetch a quiz by its ID

__Description:__

It has to return the quiz using its ID and some informations related to.

__Request__

_Get /quiz/{id}_

__Headers__

+ _x-access-token: Bearer "add the token here"_

__Responses:__
    
    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

If everything goes right the server will return a json:

    {
        "id": 6,
        "title": "My first quiz",
        "createdAt": "2020-10-12T16:54:46.000Z",
        "updatedAt": "2020-10-12T16:54:46.000Z",
        "Questions": [
            {
                "id": 6,
                "question": "What does 'OS' stand for?",
                "quizId": 6,
                "Alternatives": [
                    {
                        "id": 11,
                        "alternative": "'OS' stands for Operating System",
                        "questionId": 6
                    },
                    {
                        "id": 12,
                        "alternative": "'OS' stands for Openned System",
                        "questionId": 6
                    }
                ]
            }
        ]
    }

## Database

The project is running _mysql_ at the production and development stage and the _sequelize_ are being used as an Object-Relational Mapping. We are not doing automated tests yet, but I want to use _sqlite3_ in memory later on.

### Schema

![DATABASE SCHEMA](docs/images/databaseSchema.png)