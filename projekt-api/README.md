## Table of Contents
- **[Getting Started](#getting-started)**<br>
- **[Installing](#installing)**<br>
- **[Overview](#overview)**<br>
- **[Back-end](#back-end)**<br>
- **[API Endpoints](#api-endpoints)**<br>
- **[Register Endpoint](#register-endpoint)**<br>
- **[Login Endpoint](#login-endpoint)**<br>
- **[Kurier Endpoint](#kurier-endpoints)**<br>
- **[Paczkomaty Endpoints](#paczkomaty-endpoints)**<br>
- **[Paczki Endpoints](#paczki-endpoints)**<br>

# backend-api
Back-end REST API

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

# Installing

A step by step series of examples that tell you how to get a development environment running
`cd` into `server` folder and install dependencies with:

1. Clone the repository:
   - git clone https://github.com/kaspares/projekt-api.git
2. Open terminal and install dependencies:
   - npm install
3. Create file .env and write:
   - DB_USER= yourname
   - DB_PASSWORD= yourpassword
   - DB_NAME= databasename
   - JWT_KEY= secret
4. Create connection to your database
5. Then launch the api with: 
nodemon server.js

# Overview
The application allows you to manage parcel lockers, parcels, and couriers. Users can create, edit, and delete parcel lockers, parcels, and assign couriers. The system provides easy tracking of parcels and organizing their delivery.
  <strong>Functioncs:</strong>
  - Creating and managing parcel lockers
  - Creating and managing parcels
  - Adding, editing, and deleting couriers
  - Assigning parcels to parcel lockers and couriers
  - Checking which parcels are in a specific parcel locker

# Back-end 

<strong>API's</strong>

The back-end exposes a set of RESTful API endpoints to interact with parcel lockers, parcels, and couriers. These endpoints allow users to create, read, update, and delete the necessary data. The API also supports querying for parcels in specific parcel lockers and assigning couriers to parcels.

<strong>RDBMS and Data Persistence</strong>

The application uses MongoDB with Mongoose for data storage and management. MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. Mongoose is used to define schemas and models for the different entities, such as parcel lockers, parcels, and couriers, and handle interactions with the database. All data is persisted in MongoDB, ensuring future retrieval and analysis.

<strong>Authentication</strong>

The application implements authentication mechanisms, such as JWT (JSON Web Tokens), to ensure that only authorized users can access or modify data (e.g., creating or updating parcels or lockers). Users must log in to receive an authentication token, which they include in the header of their API requests.

# API Endpoints
Use Base URL: http://localhost:3000/

Register & Login 
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| POST   | /users/signup          | registers new users                              |
| POST   | /users/login           | logins into user account                         |

Kurierzy
| Method | Route                  | Description                                      |
|--------|------------------------|--------------------------------------------------|
| GET    | /kurierzy              | returns array of kurierzy in database            |
| GET    | /kurierzy/:id          | returns kurierzy specified by :id                |
| PUT    | /kurierzy/:id          | updates kurier specified by :id                  |
| POST   | /kurierzy              | creates & returns new kurier                     |
| DELETE | /kurierzy/:id          | deletes kurier specified by :id                  |

Paczkomaty
| Method | Route                      | Description                                  |
|--------|----------------------------|----------------------------------------------|
| GET    | /paczkomaty                | returns array of paczkomaty                  |
| GET    | /paczkomaty/:id            | returns array of paczkomat by ID             |
| GET    | /paczkomaty/:id/paczki     | returns array of paczki in paczkomat         |
| post   | /paczkomaty                | creates & returns new paczkomat              |
| PUT    | /paczkomaty/:id            | updates paczkomat specified by :id           |
| DELETE | /paczkomaty/:id            | deletes paczkomat specified by :id           | 

Paczki
| Method | Route                      | Description                                  |
|--------|----------------------------|----------------------------------------------|
| GET    | /paczki                    | returns array of paczki                      |
| GET    | /paczki/:id                | returns array of paczka by ID                |
| post   | /paczki                    | creates & returns new paczka                 |
| PUT    | /paczki/:id                | updates paczkomat specified by :id           |
| DELETE | /paczki/:id                | deletes paczkomat specified by :id           | 

## Register Endpoint
```js
POST /users/signup 
```
Expected Body 
```js
    {
    "email": "example@gmail.com", // string, unique, required
    "password": "password", // string, required
    }
```

Expected Response
```js
{
    "wiadomosc": "Dodano uzytkownika"
}
```

## Login Endpoint
```js
POST /users/login 
```
Expected Body
```js
{
    "email: "example@gmail.com",
    "password": "example123"
}
```
Expected Response
```js
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxMiwidXNlcm5hbWUiOiJuZXdfdXNlcjEyMTIxMiIsImlhdCI6MTU5ODQyMDg0NywiZXhwIjoxNTk4NDI4MDQ3fQ.YyR_rrRxYaDVTt3FPM155hPwbUAEFhyaDSOWqVOD8kM"
}
```


## Kurier Endpoints
### GET All kurierzy
```js
GET http://localhost:3000/kurierzy

Expected Response: returns array of kurierzy in database 
{
    "wiadomość": "Liszta wszystkich kurierów",
    "kurierzy": [
        {
            "_id": "677eecaf3fdb91fe83c2cc83",
            "imie": "Julia",
            "nazwisko": "Kowalska",
            "__v": 0
        }
    ]
}
```
### GET kurierzy By ID
```js
GET http://localhost:3000/kurierzy/id

Expected Response: returns kurier specified by :id
{
    "wiadomość": "Szczegóły kuriera o numerze 678901eab062a8f63436b040",
    "kurier": {
        "_id": "678901eab062a8f63436b040",
        "imie": "Maciek",
        "nazwisko": "Łomża",
        "__v": 0
    }
}
```
### POST kurierzy
```js
POST http://localhost:3000/kurierzy

Expected Body: 
{
    "imie": "Jan", //name example
    "nazwisko": "Kowalski" //surname example
})
Expected Response: returns object of created kurierzy in database 

{
    "wiadomość": "Nowy kurier został dodany!",
    "kurier": {
        "_id": "678819627e7d7c268866b9cc"
	imie: "Jan", //name example
	nazwisko: "Kowalski", //surname example
	"__v": 0,
    }
}
```

### PUT kurierzy By ID
```js
PUT http://localhost:3000/kurierzy

{
    "wiadomość": "Nie odnaleziono"
}

Expected Response: updates campaign specified by :id

PUT http://localhost:3000/kurierzy/id
{
    "wiadomość": "Zaktualizowano kuriera o numerze 677eecaf3fdb91fe83c2cc83",
    "updatedKurier": {
        "_id": "677eecaf3fdb91fe83c2cc83",
        "imie": "Julia",
        "nazwisko": "Kowalska",
        "__v": 0
    }
}

```

### DELETE kurierzy by ID
```js
DELETE  http://localhost:3000/kurierzy/id

Expected Response: deletes kurierzy specified by :id

Expected Response: 
    {
    "wiadomość": "Usunięto kuriera o numerze 677eecaf3fdb91fe83c2cc83"
}
```

## paczkomaty Endpoints
### GET All paczkomaty
```js
GET http://localhost:3000/paczkomaty

Expected Response: returns array of paczkomaty in database 
{
    "wiadomość": "Lista wszystkich paczkomatów",
    "paczkomaty": [
        {
            "_id": "677eed933fdb91fe83c2cc8b",
            "miasto": "Płock",
            "adres": "Klonowa 1",
            "pojemnosc": 20,
            "__v": 0
        }
    ]
}
```
### GET paczkomat by ID
```js
GET http://localhost:3000/paczkomaty/id

Expected Response: returns paczkomat specified by :id
{
    "wiadomość": "Szczegóły paczkomatu o numerze 677eed933fdb91fe83c2cc8b",
    "paczkomat": {
        "_id": "677eed933fdb91fe83c2cc8b",
        "miasto": "Płock",
        "adres": "Klonowa 1",
        "pojemnosc": 20,
        "__v": 0
    }
}
```

### GET paczki in paczkomat
```js
GET http://localhost:3000/paczkomaty/id/paczki

Expected Response: returns paczki in paczkomat
{
    "wiadomość": "Lista paczek dostarczonych do paczkomatu 677eed933fdb91fe83c2cc8b",
    "paczki": [
        {
            "_id": "677eef763fdb91fe83c2cca0",
            "kodPaczki": "123",
            "kurier": "677eecaf3fdb91fe83c2cc83",
            "paczkomat": "677eed933fdb91fe83c2cc8b",
            "status": "dostarczona",
            "__v": 0
        }
    ]
}
```
### POST paczkomaty
```js
POST http://localhost:3000/paczkomaty

Expected Body: 
{
    "miasto": "Puck",
    "adres": "Wolna",
    "pojemnosc": "10"
}
Expected Response: returns object of created kurierzy in database 

{
    "wiadomość": "Nowy paczkomat został dodany!",
    "paczkomat": {
        "_id": "67881d0e7e7d7c268866b9d5",
        "miasto": "Puck", // city example
        "adres": "Wolna", // adress example
        "pojemnosc": 10, // capacity example
        "__v": 0
    }
}
```

### PUT paczkomaty By ID
```js
PUT http://localhost:3000/paczkomaty

{
    "wiadomość": "Nie odnaleziono"
}

Expected Response: updates campaign specified by :id

PUT http://localhost:3000/paczkomaty/67881d0e7e7d7c268866b9d5
{
    "wiadomość": "Zaktualizowano paczkomat o 67881d0e7e7d7c268866b9d5",
    "updatedPaczkomat": {
        "_id": "67881d0e7e7d7c268866b9d5",
        "miasto": "Puck",
        "adres": "Wolna",
        "pojemnosc": 10,
        "__v": 0
    }
}

```

### DELETE paczkomaty by ID
```js
DELETE  http://localhost:3000/paczkomaty/67881d0e7e7d7c268866b9d5

Expected Response: deletes paczkomaty specified by :id

Expected Response: 
{
    "wiadomość": "Usunięto paczkomat o numerze 67881d0e7e7d7c268866b9d5"
}
```

## paczki Endpoints
### GET All paczki
```js
GET http://localhost:3000/paczki

Expected Response: returns array of paczki in database 
{
    "wiadomość": "Lista wszystkich przesyłek",
    "paczki": [
        {
            "_id": "677eef763fdb91fe83c2cca0",
            "kodPaczki": "123",
            "kurier": null,
            "paczkomat": {
                "_id": "677eed933fdb91fe83c2cc8b",
                "miasto": "Płock",
                "adres": "Klonowa 1"
            },
            "status": "dostarczona",
            "__v": 0
        },
        {
            "_id": "677f7827382767cc994affd0",
            "kodPaczki": "ABC123",
            "kurier": "",
            "paczkomat": {
                "_id": "677eed933fdb91fe83c2cc8b",
                "miasto": "Płock",
                "adres": "Klonowa 1"
            },
            "status": "dostarczona",
            "__v": 0
        }
    ]
}
```
### GET paczki by ID
```js
GET http://localhost:3000/paczki/id

Expected Response: returns paczki specified by :ID
{
    "wiadomość": "Szczegóły paczki o numerze 678905b3b062a8f63436b057",
    "paczka": {
        "_id": "678905b3b062a8f63436b057",
        "kodPaczki": "ABC123",
        "kurier": {
            "_id": "678901eab062a8f63436b040",
            "imie": "Maciek",
            "nazwisko": "Łomża"
        },
        "status": "dostarczona",
        "__v": 0
    }
}
```

### POST paczki
```js
POST http://localhost:3000/paczki

Expected Body:
{
    "kodPaczki": "ABC123",
    "kurierId": "678901eab062a8f63436b040",
    "paczkomat": "677eed933fdb91fe83c2cc8b",
    "status": "dostarczona"

}
Expected Response: returns object of created kurierzy in database 

{
    "wiadomość": "Nowa przesyłka została dodana!",
    "paczka": {
        "_id": "6789065bb062a8f63436b067",
        "kodPaczki": "ABC123",
        "kurier": "678901eab062a8f63436b040",
        "status": "dostarczona",
        "__v": 0
    }
}
```

### PUT paczki By ID
```js
PUT http://localhost:3000/paczki

{
    "wiadomość": "Nie odnaleziono"
}

Expected Response: updates campaign specified by :id

PUT http://localhost:3000/paczki/id
{
    "wiadomość": "Zaktualizowano paczke o numerze 677eef763fdb91fe83c2cca0",
    "updatedPaczka": {
        "_id": "677eef763fdb91fe83c2cca0",
        "kodPaczki": "123",
        "kurier": "677eecaf3fdb91fe83c2cc83",
        "paczkomat": "677eed933fdb91fe83c2cc8b",
        "status": "dostarczona",
        "__v": 0
    }
}

```

### DELETE paczki by ID
```js
DELETE  http://localhost:3000/paczki/id

Expected Response: deletes campaign specified by :id

Expected Response: 
    {
    "wiadomość": "Usunięto paczke o numerze 677eef763fdb91fe83c2cca0"
}
```
