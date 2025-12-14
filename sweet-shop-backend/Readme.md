🍬 Sweet Shop Management System (TDD Kata)
A backend RESTful API for managing a sweet shop, built using Node.js, TypeScript, Express, MongoDB, and Test-Driven Development (TDD) principles.

This project fulfills all the requirements of the TDD Kata: Sweet Shop Management System, including authentication, authorization, inventory management, and comprehensive automated testing.

🚀 Tech Stack
Backend: Node.js, TypeScript, Express

Database: MongoDB (Mongoose)

Authentication: JWT (JSON Web Tokens)

Password Security: bcrypt

Testing: Jest, Supertest

Dev Tools: ts-node-dev, dotenv

API Testing: Postman

📁 Project Structure

src/
├── app.ts
├── server.ts
├── config/
│   └── db.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.routes.ts
│   └── auth.service.test.ts
├── sweets/
│   ├── sweet.model.ts
│   ├── sweet.service.ts
│   ├── sweet.controller.ts
│   ├── sweet.routes.ts
│   ├── sweet.service.test.ts
│   └── sweet.test.ts
├── middleware/
│   └── auth.middleware.ts
└── tests/
    └── health.test.ts

⚙️ Environment Setup
1️⃣ Clone the repository

git clone <your-github-repo-url>
cd sweet-shop

2️⃣ Install dependencies

npm install

3️⃣ Create .env file
env
Copy code
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=your_jwt_secret
▶️ Run the Application
bash
Copy code
npx ts-node-dev src/server.ts
Expected output:

arduino
Copy code
Server running on port 3000
MongoDB connected
🧪 Run Tests
bash
Copy code
npx jest
All tests pass:

yaml
Copy code
Test Suites: 4 passed, 4 total
Tests: 14 passed, 14 total
🩺 Health Check
bash
Copy code
GET /health
Response:

json
Copy code
{
  "status": "OK"
}
🔐 Authentication Endpoints
Register User
arduino
Copy code
POST /api/auth/register
json
Copy code
{
  "email": "admin@test.com",
  "password": "admin123",
  "role": "ADMIN"
}
Login User
bash
Copy code
POST /api/auth/login
Response:

json
Copy code
{
  "token": "<JWT_TOKEN>"
}
🍭 Sweets API (Protected)
All endpoints below require:

makefile
Copy code
Authorization: Bearer <JWT_TOKEN>
Add Sweet
bash
Copy code
POST /api/sweets
json
Copy code
{
  "name": "Ladoo",
  "category": "Indian",
  "price": 20,
  "quantity": 100
}
Get All Sweets
bash
Copy code
GET /api/sweets
Search Sweets
sql
Copy code
GET /api/sweets/search?category=Indian&minPrice=10&maxPrice=50
Update Sweet
bash
Copy code
PUT /api/sweets/:id
json
Copy code
{
  "price": 25,
  "quantity": 80
}
Delete Sweet (ADMIN only)
bash
Copy code
DELETE /api/sweets/:id
📦 Inventory Management
Purchase Sweet
bash
Copy code
POST /api/sweets/:id/purchase
➡️ Decreases quantity by 1

Restock Sweet (ADMIN only)
bash
Copy code
POST /api/sweets/:id/restock
json
Copy code
{
  "amount": 10
}
🔐 Authorization Rules
Action	Role Required
View sweets	Authenticated
Add sweet	Authenticated
Purchase sweet	Authenticated
Restock sweet	ADMIN
Delete sweet	ADMIN

🧪 Testing Strategy
Service-level unit tests using Jest

Database isolation using a separate test DB

beforeEach cleanup for deterministic tests

Authentication & inventory edge cases covered

🤖 AI Usage Disclosure
AI tools (ChatGPT) were used only as a development assistant for:

Debugging guidance

Code review

Documentation support

All design decisions, code integration, and testing were performed manually and fully understood by the developer.

✅ Status
✔ All required endpoints implemented
✔ JWT authentication & role-based authorization
✔ MongoDB persistence
✔ All tests passing
✔ Backend complete as per kata specification

🚀 Push to GitHub (FINAL STEP)
From your project root:

bash
Copy code
git status
git add .
git commit -m "feat: complete sweet shop backend with auth, inventory, and tests"
git push origin main