# 🛒 MERN E-Commerce App

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js). Features authentication, product display, category filtering, cart functionality, and secure token management.

Check out the live version of the project [here](https://mern-e-commerce-app-tau.vercel.app/)


## 🚀 Features

- 🔐 User Authentication (JWT + Refresh Token)
- 👤 Login, Register, Logout
- 🛍️ Product Display (via FakeStoreAPI proxy)
- 🧾 Add to Cart
- 📂 Category Filter + Sorting
- 🧱 MongoDB integration for users & more
- ☁️ Cloud image upload (optional)
- ⚙️ Protected routes for Admin
- ✅ CORS-safe API access

---

## 📦 Tech Stack

**Frontend**: React, Axios, Context API, Tailwind (or CSS)  
**Backend**: Node.js, Express, MongoDB, Mongoose  
**Security**: JWT, HttpOnly Cookies, CORS, Environment Variables

---

## 🌐 Project Structure

```txt
client/
│
├── src/
│   ├── API/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── GlobalState.js
│
server/
│
├── controllers/
├── models/
├── routes/
├── middleware/
└── server.js
```
# Clone project

## Local Development
git clone [https://github.com/yourname/ecommerce-app.git](https://github.com/soumens7/MERN-E-Commerce-App.git)

# Setup client
cd client
npm install
npm start

# Setup server
cd ../server
npm install
npm run dev

## Environment Variables
client/.env
REACT_APP_API_URL=http://localhost:4000

server/.env
PORT=4000
CLIENT_URL=http://localhost:3000  
MONGODB_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret
