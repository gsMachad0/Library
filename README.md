# Library Node API

 Description: This is a basic Node.js API that allows users to create books and authors through REST requests. 
The API is built using the MVC structure with Express and uses Mongoose to connect to a MongoDB database. 
The API supports CRUD operations for both books and authors, as well as querying books by publisher.

# Features:
Create, read, update, and delete books;
Create, read, update, and delete authors;
Query books by publisher;
MongoDB as database backend;
Mongoose as ODM;
MVC structure using Express;
 
# Installation:
Clone the repository
Run npm install to install dependencies
Set environment variables for MongoDB connection (MONGODB_URI) and server port (PORT)
 
# Usage:
Start the server with npm start;
Send requests to the API endpoints (e.g. POST /books, GET /authors/:id);

# Endpoints:
GET /books - get all books
GET /books/search - get all books by publisher
GET /books/:id - get a specific book by ID
POST /books - create a new book
PUT /books/:id - update a specific book by ID
DELETE /books/:id - delete a specific book by ID
GET /authors - get all authors
GET /authors/:id - get a specific author by ID
POST /authors - create a new author
PUT /authors/:id - update a specific author by ID
DELETE /authors/:id - delete a specific author by ID
 
# Controllers:
BookController
AuthorController
