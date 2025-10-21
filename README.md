# Simple Authentication System
A full-stack web application demonstrating a secure user authentication system with registration and login functionality. The project features a Next.js frontend and a Node.js (Express) backend with a MySQL database.

## Technology Stack
+ Frontend: Next.js (React)
+ Backend: Node.js, Express.js
+ Database: MySQL
+ Authentication: JWT (JSON Web Tokens)
+ Password Hashing: Bcrypt

+ Styling: CSS Modules
## Features
+ Secure user registration with password hashing.
+ JWT-based user login with httpOnly cookies for security.
+ Session management with automatic logout on token expiration.
+ Protected routes for authenticated users.
+ Real-time password validation UI.
+ Automated database and table setup on the first run.
+ Protection against SQL Injection, XSS, and CSRF.

## Project Setup

### Prerequisites
+ Node.js (v18 or newer recommended)
+ npm or yarn
+ A running MySQL server instance

### Installation
1. #### Clone the repository:

``` bash 
git clone https://github.com/Dimasgrom/example-auth-system.git
cd example-auth-system
```


2. #### Setup the Backend:
``` bash 
cd backend
npm install
```

Create a .env file in the backend directory. Copy the contents below and fill in your MySQL credentials.
```
# .env file for the backend

# MySQL Database Connection
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=auth_db

# JWT Secret Key (use a long, random string)
JWT_SECRET=your_super_secret_jwt_key

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

3. #### Setup the Frontend:
```
cd ../frontend/example-auth-system
npm install
```


### Running the Application
You need to run both the backend and frontend servers simultaneously in two separate terminals.

1. #### Start the Backend server:
(In the backend directory)
```
npm run dev
```

The server will start on http://localhost:3001. The first time you run this, it will automatically create the auth_db database and users table.

2. #### Start the Frontend server:
(In the frontend/example-auth-system directory)
```
npm run dev
```

The application will be available at http://localhost:3000.
