# CoMAP

This is the backend part of the [CoMAP (Read more about it here)](https://github.com/kuzunov/comap) app.

## Installation 

Clone the repository and run yarn or npm to install the required dependencies.

## Required configuration

You have to create a `.env` file in the root directory of the project.
In this file you will need to cofigure the following variables.

```
HOSTNAME = your-hostname
PORT = a-port-that-the-app-will-listen-on
DB_URL = a-db-url
DB_NAME = name-of-db
JWT_SECRET_KEY= a-secret-key-to-sign-jwt-with
```

## Main technologies

### [Node.js](https://nodejs.org/en/)
### [Express](https://expressjs.com/)
### [MongoDB] (https://www.mongodb.com/)
