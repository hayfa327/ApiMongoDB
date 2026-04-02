# 🎨 Mesum – Full Stack Art Platform

Mesum is a full-stack web platform designed to manage and showcase exhibitions, artists, and cultural events.

It combines a Node.js + Express backend with a React frontend, using MongoDB Atlas (cloud database) for persistent data storage.

---

## 🌐 Live API
https://mesum-api.onrender.com

---

## 🧠 Project Overview

Mesum is built as a scalable system for art platforms, including:

- Exhibitions  
- Artists  
- Future support for performances, theater, and cultural events  

### 🎯 The platform focuses on:

- Clean, gallery-style UI  
- Role-based access control  
- Secure authentication (JWT)  
- Structured data relationships (Artist ↔ Exhibition)  

---

## 🏗 Full Stack Architecture

Frontend (React / Vite)  
↓  
Backend API (Node.js / Express)  
↓  
MongoDB Atlas (Cloud Database)

- Backend hosted on Render  
- Database hosted on MongoDB Atlas (NOT local storage)  
- Code managed via GitHub  

---

## 🛠 Tech Stack

### 🔹 Frontend
- React.js (Vite)  
- React Router DOM  
- Custom CSS (no framework)  
- Fetch API  

### 🔹 Backend
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  
- JWT Authentication  
- bcrypt (password hashing)  

---

## 👥 User Roles & Permissions

### Visitor
- View exhibitions  

### Artist
- Can be assigned to exhibitions  
- Represents creators in the system  

### Admin
- Create exhibitions  
- Create artist accounts  
- Manage platform content  

---

## 🔐 Authentication System

- JWT-based authentication  
- Token returned on login  
- Token stored on frontend  
- Used for protected routes  

### Header format:
Authorization: Bearer YOUR_TOKEN  

---

## 👤 User Flow (Testing the System)

### 1. Register
POST /api/v1/users/register  

- Every new user is automatically assigned:
- role: visitor  

---

### 2. Login
POST /api/v1/users/login  

- Returns JWT token  
- Required for protected actions  

---

### 3. Admin Actions

Only admin users can:

- Create artists  
- Create exhibitions  

---

## 🎨 Artist System

- Admin creates an artist account  
- Each artist gets a unique ID  

### This ID is used to:

- Link exhibitions to the artist  
- Maintain ownership  
- Enable future editing permissions  

### This allows:

- Artists to be consistently referenced  
- Exhibitions to belong to a specific artist  
- Future editing rights based on artist identity  

---

## 🖼 Exhibition System

### Create Exhibition (Admin only)
POST /api/v1/exhibitions/create  

### Required fields:
- title  
- description  
- startDate  
- endDate  
- artistId  

---

### Get All Exhibitions (Public)
GET /api/v1/exhibitions/all  

---

### Key Logic

- Each exhibition is linked to an artist (by ID)  
- Titles are unique  
- Data is stored in MongoDB Atlas  

---

## 🔍 Future Features (Planned)

### Visitors will be able to:
- Search exhibitions by artist name  
- Search exhibitions by title  

### Artists will be able to:
- Edit their own exhibitions (via ID & authentication)  

### Platform will expand to support:
- Performances  
- Theater  
- Cultural events  

---

## 🎨 Frontend Features

### Home Page
- Displays featured exhibitions  
- Gallery-style layout  
- UI still in progress  

---

### Exhibitions Page
- Clean grid layout  
- Large artwork-focused images  
- Minimal design  

---

### Authentication
- Register  
- Login  
- Change password  

---

### Admin Dashboard
- Create Exhibition  
- Add Artist  
- View Exhibitions  
- Quick stats  

---

## ⚙️ Setup & Run

### Backend
- Hosted on Render  

### Frontend
npm run dev  

---

## 📡 API Base URL
https://mesum-api.onrender.com/api/v1  

---

## ⚠️ Important Notes

- Database is hosted on MongoDB Atlas (cloud)  
- NOT using localStorage for data persistence  
- JWT required for protected routes  
- Role-based access is enforced  
- Validation errors return HTTP 400  

---

## 🚧 Project Status

### Work in Progress

### Completed:
- Core system architecture  
- Authentication system  
- Exhibition management  
- Admin workflow  

### In progress:
- Home page UI improvements  
- Search functionality  
- Artist editing permissions  
- UI/UX enhancements  

---

## 🎯 Project Vision

Mesum is designed as a scalable digital platform for art and culture.

### It supports:
- Exhibitions  
- Artists  
- Cultural archives  

### Future expansion includes:
- Performances  
- Interactive experiences  
- Artist portfolios  
- Public discovery tools  

---

## 👨‍💻 About

This project demonstrates:

- Full-stack development  
- API design  
- Authentication systems  
- Role-based architecture  
- UI/UX for art platforms  