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
	    "username": "cleiton",
        "email": "cleiton@email.com",
		"password": "teste",
		"profilePicture": null
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

If everything goes right the server will return a json:

    {
        "id": "6cbffb64-4d29-443e-8889-0e64c43d692e",
        "username": "cleiton",
        "email": "cleiton@email.com",
        "profilePicture": null,
        "createdAt": "2020-10-18T16:12:57.057Z"
    }

### Login

__Description:__

After the users’ account has been set up, they can use their credentials to sign in the system.

__Request:__

_Post /auth/login_

    {
        "email": "cleiton@email.com",
		"password": "teste"
    }

__Parameters:__

+ email: required, email
+ password: required, string

__Responses:__
    
    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

If everything goes right the server will return a json:

    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjp7ImlkIjoiNmNiZmZiNjQtNGQyOS00NDNlLTg4ODktMGU2NGM0M2Q2OTJlIiwidXNlcm5hbWUiOiJjbGVpdG9uIiwiZW1haWwiOiJjbGVpdG9uQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHNXSnZnU01PancwSGpoUThNTjI5N3VuMmxJL3h1OG0uS0ZkOTYzVXZWQ1l1VGpXRjN3eG5pIn0sImlhdCI6MTYwMzAzODE3NiwiZXhwIjoxNjAzMDQxNzc2fQ.DsUSPcKzdhHZdzAZKmltl-FGb_hlvsWYVGTVRdtZ9Q4" }

### Create a quiz

__Description:__

A authenticated user should be able to easily create a quiz.

__Request:__

_Post /quiz_

    {
        "title": "General Knowledge",
        "questions": [
            {
                "question": "In what part of the body would you find the fibula?",
                "alternatives": [
                    {"alternative": "thigh"},
                    {"alternative": "leg"},
                    {"alternative": "head"},
                    {"alternative": "arm"}
                ]
            },
            {
                "question": "If you have CRYOPHOBIA, what are you afraid of?",
                "alternatives": [
                    {"alternative": "Ice/Cold"},
                    {"alternative": "Cramped space"},
                    {"alternative": "Spiders"},
                    {"alternative": "Darkness"}
                ]
            },
            {
                "question": "What is the smallest planet in our solar system?",
                "alternatives": [
                    {"alternative": "Earth"},
                    {"alternative": "Pluto"},
                    {"alternative": "Venus"},
                    {"alternative": "Mercury"}
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

If everything goes right the server will return a json:

    {
        "id": "6cbffb64-4d29-443e-8889-0e64c43d692e",
        "username": "cleiton",
        "email": "cleiton@email.com",
        "profilePicture": null,
        "createdAt": "2020-10-18T16:12:57.000Z",
        "updatedAt": "2020-10-18T16:12:57.000Z",
        "Quizzes": [
            {
                "id": "b9bbf905-f442-431a-970f-bca772bcb901",
                "title": "General Knowledge",
                "createdAt": "2020-10-18T16:40:46.000Z",
                "updatedAt": "2020-10-18T16:40:46.000Z"
            }
        ]
    }

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
    "id": "b9bbf905-f442-431a-970f-bca772bcb901",
    "title": "General Knowledge",
    "createdAt": "2020-10-18T16:40:46.000Z",
    "updatedAt": "2020-10-18T16:40:46.000Z",
    "Questions": [
        {
            "id": "02c15778-d052-427c-a618-f848e22baedd",
            "question": "What is the smallest planet in our solar system?",
            "quizId": "b9bbf905-f442-431a-970f-bca772bcb901",
            "Alternatives": [
                {
                    "id": "1bc93c11-a3a6-4f63-b41c-c2752d2afa18",
                    "alternative": "Earth",
                    "questionId": "02c15778-d052-427c-a618-f848e22baedd"
                },
                {
                    "id": "605a8801-2efe-4a81-9653-30dbb1d066b5",
                    "alternative": "Pluto",
                    "questionId": "02c15778-d052-427c-a618-f848e22baedd"
                },
                {
                    "id": "a7c0f12f-a40c-4493-b24a-cafa57cf2602",
                    "alternative": "Venus",
                    "questionId": "02c15778-d052-427c-a618-f848e22baedd"
                },
                {
                    "id": "d06d66bb-d6cc-4a4e-b1fb-5aa2066b4706",
                    "alternative": "Mercury",
                    "questionId": "02c15778-d052-427c-a618-f848e22baedd"
                }
            ]
        },
        {
            "id": "cea94081-d418-4104-9637-6430e13005b3",
            "question": "In what part of the body would you find the fibula?",
            "quizId": "b9bbf905-f442-431a-970f-bca772bcb901",
            "Alternatives": [
                {
                    "id": "157a3b00-89d3-4e46-9759-96a2c6843f28",
                    "alternative": "thigh",
                    "questionId": "cea94081-d418-4104-9637-6430e13005b3"
                },
                {
                    "id": "52092068-236c-4eb4-8b00-52720bc50c80",
                    "alternative": "head",
                    "questionId": "cea94081-d418-4104-9637-6430e13005b3"
                },
                {
                    "id": "81fb6fce-226c-4c2d-a3c5-ed62f5a3e2b8",
                    "alternative": "arm",
                    "questionId": "cea94081-d418-4104-9637-6430e13005b3"
                },
                {
                    "id": "93027aec-f192-46ad-91c1-f80fc69e2994",
                    "alternative": "leg",
                    "questionId": "cea94081-d418-4104-9637-6430e13005b3"
                }
            ]
        },
        {
            "id": "f4c5104a-c02c-4598-87a1-2a46e702f38e",
            "question": "If you have CRYOPHOBIA, what are you afraid of?",
            "quizId": "b9bbf905-f442-431a-970f-bca772bcb901",
            "Alternatives": [
                {
                    "id": "2aec5d3b-fba8-4d64-b0a7-1d0441def217",
                    "alternative": "Cramped space",
                    "questionId": "f4c5104a-c02c-4598-87a1-2a46e702f38e"
                },
                {
                    "id": "44f02228-1505-46a3-8ec3-7959fe65096b",
                    "alternative": "Spiders",
                    "questionId": "f4c5104a-c02c-4598-87a1-2a46e702f38e"
                },
                {
                    "id": "ad910cdd-8214-45af-9ebe-f74a6f525606",
                    "alternative": "Ice/Cold",
                    "questionId": "f4c5104a-c02c-4598-87a1-2a46e702f38e"
                },
                {
                    "id": "dc6df047-a7f1-4506-b794-9ce25702ec1d",
                    "alternative": "Darkness",
                    "questionId": "f4c5104a-c02c-4598-87a1-2a46e702f38e"
                }
            ]
        }
    ]
}

### Delete a quiz by its ID

__Description:__

The quiz should be deleted as such all its information related with.

__Request__

_Delete /quiz_

    { "quiz": "b9bbf905-f442-431a-970f-bca772bcb901" }

__Parameters:__

+ quiz: required, number

__Headers__

+ _x-access-token: Bearer "add the token here"_

__Responses:__

    200 - OK.
	401 - Unauthorized.
    500 - Server Error.

## Database

The project is running _mysql_ at the production and development stage and the _sequelize_ are being used as an Object-Relational Mapping. We are not doing automated tests yet, but I want to use _sqlite3_ in memory later on.

### Schema

![DATABASE SCHEMA](docs/images/databaseSchema.png)