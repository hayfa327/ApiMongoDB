# Mesum API – Backend Platform for Exhibitions

Mesum API is a 
* Node.js 
* Express 
* MongoDB backend designed to manage users, roles, and exhibitions for an online art platform.

## The API is deployed online and publicly accessible at: https://mesum-api.onrender.com

* Tech Stack Node.js, Express.js, MongoDB Atlas (Cloud Database), 
* Mongoose JWT Authentication Render (Cloud Server)

##  Architecture Client
 → Render (Node API) → MongoDB Atlas Code hosted on GitHub Server deployed on Render Database hosted on MongoDB Atlas

## User Roles The system uses role-based access control: 
* Role Permissions visitor View exhibitions 
* artist Can be assigned to exhibitions 
* admin Can create exhibitions


## Authentication Routes 
* Base path: /api/v1/users 
* Method Route Description 
* POST /register Register a new user 
* POST /login Login and receive JWT token 
* POST /logout Logout user 
* PUT /change-password Change password (requires token) Example


### Exhibition Routes Base path: 
* /api/v1/exhibitions 
* POST /create Admin only Create a new exhibition
* GET /all Public Get all exhibitions   
 

Authentication (JWT) Protected routes require a JWT token in the request header: Authorization: Bearer YOUR_TOKEN The token is received from the login route.

## Database Design
* Users username (not unique)
*  email (unique)
*  password (hashed with bcrypt) 
*  role (visitor / artist / admin) 
*  Exhibitions title (unique) 
*  description 
*  startDate endDate 
*  artist (reference to User)

## API Testing 
Use Postman or any API client with the live URL: https://mesum-api.onrender.com 
Example testing 
* flow Register a user Login to get JWT token Use admin account to create an exhibition Fetch exhibitions publicly Important Notes:
* Exhibition titles are unique by design 
* Emails are unique for users 
* Usernames are not unique 
* Validation errors return HTTP 400 Duplicate key errors are handled correctly

## About
build Api with express.js and mongoDB for platfrom online as mesume for theaters, exhibitions , concerts .....

 