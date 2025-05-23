# MULTI ROLE PROJECT MANAGEMENT SYSTEM

A full-stack role-based project management system with task and user management built using **React**, **Node.js**, **Express**, and **MongoDB**. It supports three user roles: **Admin**, **Manager**, and **Member**, with different levels of permissions across projects, tasks, and users.

---

## 🚀 Features

### ✅ Frontend (React + Tailwind CSS)

- Create users with name, email, password, and role
- List users (filtered by role access)
- Role-based UI access: Admin, Manager, Member
- Secure API communication via JWT token using `AuthContext`
- Responsive design with Tailwind CSS
- Toast notifications using Sonner

### ✅ Backend (Node.js + Express + MongoDB)

- JWT-based authentication
- Role-based authorization
- CRUD for projects and tasks (based on role)
- Create and view users (Admin/Manager)
- Global error handling and rate limiting

---

## 🖥 Frontend

### 🛠 Tech Stack

- **React**
- **Tailwind CSS**
- **Axios**
- **Sonner**
- **Context API**

### 📁 Project Structure

src/
├── api/                    # Axios instance and API service modules
│   └── axios.js            # Axios setup with baseURL and interceptors
│
├── contexts/               # React Context providers for global state
│   └── AuthContext.js      # Authentication context (handles login, token, user roles)
│
├── layout/                 # Shared layout components
│   └── CommonLayout.js     # Wrapper layout used across protected pages
│
├── pages/                  # Application page components
│   ├── DashboardPage.js    # Main dashboard (role-specific content)
│   ├── LoginPage.js        # Login screen with authentication form
│   ├── UsersPage.js        # User management (Admin: all users, Manager: members, Member: none)
│   ├── ProfilePage.js      # Current user profile details
│   ├── ProjectListPage.js  # Project management (Create/Update/Delete - Admin & Manager)
│   └── TaskListPage.js     # Task management
│                           # - Admin: manage all tasks
│                           # - Manager: manage member tasks
│                           # - Member: update own task status
│
├── components/             # Protected Route
│
├── App.js                  # Main app entry with routing
├── App.css                 # Global custom styles
├── main.js                 # React root rendering
├── main.css                # Tailwind CSS configuration entry


## Install dependencies

npm install

## Start development server

npm run dev

## Build for production

npm run build

## Environment

VITE_API_BASE_URL=http://localhost:5000/api




# MULTI ROLE PROJECT MANAGEMENT SYSTEM DASHBOARD (Backend)

A role-based task management backend built with **Node.js**, **Express**, and **MongoDB** using **JWT Authentication**. This system supports `Admin`, `Manager`, and `Member` roles with permission-based access to projects, tasks, and users.

## ⚙️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT** for Authentication
- **bcryptjs** for Password Hashing
- **express-rate-limit** for Rate Limiting

## 📦 Folder Structure

backend/
│
├── config/
│ ├── db.js # database
│
├── controllers/ # Route logic for each feature
│ ├── authController.js # Handles login and token refresh
│ - login(email, password) → issues access & refresh token
│ - refreshToken(refreshToken) → generates new access token
│
│ ├── projectController.js # Project CRUD (Admin/Manager only)
│ - createProject() → creates a new project
│ - getProjects() → fetches all projects (paginated)
│ - updateProject() → updates project details
│ - deleteProject() → removes a project
│
│ ├── taskController.js # Task management (based on role)
│ - createTask() → Admin/Manager can assign tasks
│ - getTasks() → all roles see tasks (filtered by access)
│ - updateTask() → Admin/Manager update all; Member only status
│ - deleteTask() → Admin/Manager can delete tasks
│
│ └── userController.js # User creation & listing
│ - createUser() → Admin/Manager can create users
│ - getUsers() → filters user list based on current role
│
├── middlewares/ # Custom middleware logic
│ ├── authMiddleware.js # Verifies JWT and sets req.user
│ - protect() → blocks access without valid token
│
│ ├── roleMiddleware.js # Role-based access control
│ - checkRole(roles[]) → restricts routes to specific roles
│
│ ├── errorHandler.js # Global error handler
│ - Catches and formats all thrown errors (400, 401, 403, 500, etc.)
│
│ └── rateLimiter.js # API rate limiting
│ - Prevents abuse by limiting repeated requests from a single IP
│
├── models/ # Mongoose schemas
│ ├── Project.js # Schema: title, description, createdBy (User), companyId
│ ├── Task.js # Schema: title, projectId, assignedTo (User), status, deadline, companyId
│ └── User.js # Schema: name, email, password (hashed), role, companyId
│
├── routes/ # API route declarations
│ ├── authRoutes.js # POST /login, POST /refresh
│ ├── projectRoutes.js # CRUD for projects (Admin/Manager)
│ ├── taskRoutes.js # CRUD for tasks (role-conditional)
│ └── userRoutes.js # POST create user, GET users (Admin/Manager only)
│
├── services/ # Utility services
│ └── tokenService.js # Generates accessToken & refreshToken using JWT
│ - generateAccessToken(user)
│ - generateRefreshToken(user)
│
├── app.js # Express app setup
│
├── .env # Environment variables
│
├── server.js # App entry point
│ - Imports all routes
│ - Applies middleware: JSON parsing, rateLimiter, protect, checkRole
│ - Mounts routers:
│ - /api/auth → authRoutes
│ - /api/projects → projectRoutes
│ - /api/tasks → taskRoutes
│ - /api/users → userRoutes
│ - Handles errors with errorHandler
│
└── package.json # Node dependencies & scripts



---

## 🔐 Middleware Summary

| Middleware         | Description                                                |
|--------------------|------------------------------------------------------------|
| `authMiddleware`   | Validates JWT and sets `req.user`                          |
| `roleMiddleware`   | Restricts access to defined roles                          |
| `errorHandler`     | Global async error handling and structured response output |
| `rateLimiter`      | Limits requests per IP to prevent abuse                    |


---

## 🚀 Setup Instructions

cd server
npm install


## Environment

PORT=5000
MONGO_URI=mongodb+srv://prabhat6914:LlWBelDSjf8mzw03@cluster0.h1on5rj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=8d4b6f4d7c8a2e9c4a1b3e6f7d9a0b1c2e3f4a5c6d7e8f9b0a1c2d3e4f5a6b7c
REFRESH_SECRET=3e7f9a1b4d6c2e8f0a5b3c7d9e1f2a4c6b8d0e9f1c3a2b4d5e6f7a8c9b0d1e

## Run the development server:

npm run dev


# DEMO LOGIN INFO

## Admin
    email : admin@gmail.com
    password : 123456
## Manager
    email : manager@gmail.com
    password : 123456
## Member 1
    email : member1@gmail.com
    password : 123456
## Member 2
    email : member2@gmail.com
    password : 123456

# Contact Info:
Email: prabhat6914@gmail.com
6386144016