# Express-Sequelize-API boilerplate

This is a simple boilerplate for creating APIs with NodeJs express framework.
Here API access token encapsulated/encrypted with JWT token based system.

- Sample API ready for login
- API middlewares for normal user and Admin user
- mocha and chai test configured
- add test case for mock database model/functions to test controllers functions

## Get Started

```
yarn global sequelize sequelize-cli or npm i sequelize sequelize-cli -g
yarn install or npm install (this will install all dependent libraries)

```

## Instal MySql

```

Go to https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/, follow the guide and install MySql

```

### Database Config Setup

Create new database (mysql). In the app/config/config.json will set below parameters.

```

    "username": "someUser",         # database username
    "password": "pass",             # database password
    "database": "name of the db",   # database name
    "host": "localhost",            # database connection host
    "dialect": "mysql"              # database dialect

```

Other inportant parameters/keys in **app/config/environments** file

```

  host: "127.0.0.1",                             # application host name
  port: 3000,                                    # application port
  JWT_SECRET: "some super duper secret",         # secret key for encrypt/decrypt JWT token
  PASSPORT_SECRET: "another super duper secret", # secret key for passport

```

### Migration, Seeders, Cleanup run

After creating database and updating env file run below commands depending the environment

```

yarn db:reset
yarn db:reset-test


```

Migration will create table users and files and seed some default users and files

- **users** - this is users table with some required fields like (username, email, age, gender)
- **files** - this is files table with some required fields like (type, name, data)

## Project Setup

### Compiles and hot-reloads for development

```

yarn serve

```

### Compiles and minifies for production

```

TBD

```

### Run your unit tests

```

yarn test

```

### Run your unit tests with coverage

```

yarn test:coverage"

```

Seeders will create 2 users entry and on file entry.

> Everythig is setup and you are good to go now. Happy Coding :)

# Other Information about setup/commands

## Routing files

> Currently we have added 2 routing files

```

> /users   # routes for the users API
> /files   # routes for the files API

```

## Example APIs

> here attached link of postman collection you can download and check in local
> https://www.getpostman.com/collections/fd7ea31a7b74c1cd8c5c - files
> https://www.getpostman.com/collections/eddeb267e3fc8fecf739 - users

### Login

```
> POST : http://localhost:3000/api/v1/users/login
> Payload: username, password
> Response :
{
    "code": 200,
    "data": {
        "success": true,
        "token": "secret token",
        "expiresIn": "1d"
    },
    "success": true
}
```

### Get user

```
> GET : http://localhost:3000/api/v1/users/1

> Response :
{
    "code": 200,
    "data": {
        "succes": true,
        "userId": 1,
        "username": "name",
        "email": "email@email.com"
    }
}
```
