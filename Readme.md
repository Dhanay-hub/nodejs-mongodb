# Node.js + MongoDB Backend Project

## Overview

This project is a backend application built with Node.js, Express, and MongoDB. It includes the following functionalities:

- **User and Role Modules**: CRUD operations for User and Role entities.
- **Authentication**: Login and signup functionality using hashed passwords.
- **Access Module Management**: Role-based access control, including adding/removing access modules.
- **Bulk Update Operations**: Update multiple users with the same or different data in a single database call.
- **Search Functionality**: Case-insensitive search for users.
- **MongoDB Aggregation Pipeline**: Utilized for advanced database queries.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Project Structure

nodejs-mongodb-backend/

    ├── config/
        ├── default.json
        └── development.json
    ├── controller/
        ├── role.js
        └── user.js
    ├── middleware/
        └── error.js
    ├── models/
        ├── Role.js
        └── User.js
    ├── routes/
        ├── role.js
        └── user.js
    ├── startup/
        ├── db.js
        ├── logging.js
        └── routes.js
    ├── app.js
    ├── Readme.md
    ├── package.json
    ├── package-lock.json
    └── .env.example

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nodejs-mongodb-backend.git
cd nodejs-mongodb-backend
```

### 2. Install Dependencies
```
npm install
```

### 3. Setup MongoDB
Make sure MongoDB is installed and running on your local machine. You can start the MongoDB service by running
```
mongod
```

You can also create a new database by accessing the MongoDB shell

```
mongo
use your-db-name
```

Create .env
```
PORT=3000
```

Update development.json for DB connection
```
dbconnectionstring=mongodb://localhost:27017/your-db-name
```

 ### 4. Run the Application
 Start the NodeJs Server
 ```
 node app.js
 ```

The server should now be running on http://localhost:3000.


For testing refer Postman collection, Provided separately.

