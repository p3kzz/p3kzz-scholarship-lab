# 🎓 Scholarship Lab

Scholarship Lab is an AI-powered scholarship recommendation platform designed to help Indonesian students discover scholarship opportunities that match their academic background, achievements, skills, and career goals.

The platform combines a modern web application with an AI recommendation engine to provide personalized scholarship matching and improve students' access to educational opportunities worldwide.

---

## 🚀 Features

### Authentication

* Email & Password Login
* Google OAuth Login
* JWT Authentication

### Student Profile Management

* Multi-step onboarding process
* Personal information
* Academic information
* Skills & achievements
* Profile completion tracking

### AI-Powered Recommendation System

* Personalized scholarship matching
* Ranking and scoring system
* Top-N recommendation generation
* Scholarship suitability analysis

### Scholarship Database

* Scholarship catalog
* Region filtering
* Funding type filtering
* Scholarship details and eligibility information

### Application Tracking

* Scholarship application history
* Feedback tracking
* Application status monitoring

### CV Integration

* CV upload support
* AI-assisted CV parsing
* Automatic profile pre-filling

---

## 🏗 Project Architecture

This repository uses a monorepo structure:

```text
scholarship-lab/
│
├── frontend/          # React + Vite Frontend
│
├── backend/           # Express.js Backend API
│
├── docker-compose.yml
│
└── README.md
```

### Frontend Stack

* React
* Vite
* React Router
* Context API
* CSS Modules / Custom CSS

### Backend Stack

* Node.js
* Express.js
* Prisma ORM
* MySQL
* JWT Authentication
* Google OAuth

### AI Service

* FastAPI
* Machine Learning Recommendation Model
* Scholarship Ranking Engine

---

## 📋 Requirements

Before running the project locally, make sure you have installed:

* Node.js 20+
* npm 10+
* Docker Desktop / CLi
* MySQL (optional if using Docker)
* Git

---

## ⚙️ Environment Variables

### Frontend

Create:

```bash
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

---

### Backend

Create:

```bash
backend/.env
```

Example:

```env
PORT=3000

DATABASE_URL="mysql://user:password@localhost:3306/scholarship_lab"

JWT_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id

AI_SERVICE_URL=https://ydmhmhm-scholarshipid.hf.space/
```

---

## 🐳 Running with Docker

From the project root:

```bash
docker compose up --build
```

To run in background:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

---

## 🗄 Database Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

(Optional) Seed database:

```bash
npm run seed
```

---

## 💻 Running Locally Without Docker

### Backend

```bash
cd backend

npm install

npm run dev
```

Backend will run at:

```text
http://localhost:3000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

---

## 🔍 API Health Check

Backend:

```text
GET /ai/health
```

Example:

```bash
curl http://localhost:3000/ai/health
```

---

## 📦 Deployment

### Frontend

Deployed using:

* Vercel

### Backend

Can be deployed using:

* Railway
* Render
* VPS
* Docker Server

### AI Service

Can be deployed using:

* Hugging Face Spaces
* VPS
* Docker Server

---

## 👨‍💻 Development Team

Scholarship Lab was developed as an educational and research project focused on improving scholarship accessibility through intelligent recommendation systems.

### Team Roles

* Fullstack Development
* AI Engineering
* Data Science

---

## 📄 License

This project is intended for educational, research, and portfolio purposes.

Feel free to fork and modify the project for learning and non-commercial use.
