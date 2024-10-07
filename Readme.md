# USER-API

## Overview

This project is CRUD based API for Users. The system also support user authentication and authorization.

### You can use POSTMAN to test this project.

## Table of Contents

- [Installation](#installation)
- [Packages/library I have Used](#packages-used)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [How to test this project](#how-to-test-this-project)

# Installation

### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/Satyam-Git-01/user-api.git

cd user-api
```

2. **Install Dependencies**

```bash
npm install
```

3. **Set Up the Database**

   1. Create a database in MySQL Workbench using this command

   ```
   create database usersDatabase
   ```

4. **Create Environment Variables**

   Create a .env file in the root directory and add the following:

```bash
PORT_NUMBER=5800
DB_SCHEMA=usersDatabase
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
JWT_TOKEN=myjwttoken

```

DB_SCHEMA in .env file should be your database name which we earlier created.

5.  **Start the Server**

```bash Copy code
npm start
```

The server will run on http://localhost:5800

# Packages Used

1. `Express` - To create an express server
2. `bcrypt `- To hash the user's password
3. `body-parser`- To parse the request body
4. `dotenv` - To get access to environment variables
5. `jsonwebtoken` - To authenticate and auhtorize
6. `mysql2` - To connect to MySQL Server
7. `Sequelize`- A ORM library to write SQL query in efficeint manner.
8. `Validator` - To sanitize the request body and maintain validation

# Environment Variables

- `PORT`: 6565
- `DB_NAME`: usersDatabase
- `DB_USER`: root
- `DB_PASSWORD`: your_password
- `DB_HOST`: your_localhost
- `JWT_SECRET`: your_secret_key

# API Endpoints

## User API

1. **Register a User**

   **Method** : POST  
   **Endpoint** : `/api/users/register`  
   **Headers** : None  
   **Body** : Given JSON

```json
{
  "username": "user",
  "email":"usermeail@gmail.com"
  "password": "password@123"
  "phonenumber":"9898989"
}
```

2. **Login a User**

   **Method** : POST  
   **Endpoint** : `/api/users/login`  
   **Headers** : None  
   **Body** :

```json
{
  "email": "useremail@gmail.com",
  "password": "password@123"
}
```

**Return JWT TOKEN AFTER SUCCESFUL LOGIN**

3. **Update a User**

   **Method** : PUT  
   **Endpoint** : `/api/users/update/:userId`  
   **Headers** : Authorization Token Required  
   **Body** : Update body in given format

```json
{
  "email": "user123@gmail.com",
  "phonenumber": "4678"
}
```

4. **Delete a User**

   **Method** : DELETE  
   **Endpoint** : `/api/users/delete/:userId`  
   **Headers** : Authorization Token Required  
   **Body** : None

5. **Get All Users**

   **Method** : GET  
   **Endpoint** : `/api/users/getAllusers`  
   **Headers** : Authorization Token Required  
   **Body** : None

6. **Get User by Id**

   **Method** : GET  
   **Endpoint** : `/api/users/getuserById/:userId`  
   **Headers** : Authorization Token Required  
   **Body** : None

# How to test this project?

1. **Use POSTMAN or ThunderClient to test it.**

   Below are the URLs:

   **Register- http://localhost:5800/api/users/register**

   **Login - http://localhost:5800/api/users/login**

   **Update - http://localhost:5800/api/users/update/1**

   **Delete- http://localhost:5800/api/users/delete/1**

   **GetAllUsers- http://localhost:5800/api/users/getAllusers**

   **GetUserById- http://localhost:5800/api/users/getuserById/2**

2. **Clone Frontend Repository**

   URL - https://github.com/Satyam-Git-01/userapi-frontend.git

   ` Go to root directory`

   `npm install`

   ` npm run dev`

   Make Sure that backend server is running !
