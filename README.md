# Thinkboard

Thinkboard is a full-stack note-taking app built with React, Express, and MongoDB. It allows users to create, view, edit, and delete notes through a clean, responsive interface.

## Features

- Create, read, update, and delete notes
- Responsive card-based dashboard
- Dedicated note detail/edit page
- MongoDB-backed persistence with Mongoose
- API rate limiting to prevent abuse
- Modern UI with Tailwind CSS and DaisyUI

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- DaisyUI
- React Router
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS
- Upstash Redis rate limiting

## Project Structure

```text
Thinkboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── package.json
├── README.md
└── .gitignore
```

## Getting Started

### 1) Install dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2) Configure environment variables

Create a `.env` file in `backend/`:

```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/thinkboard
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 3) Run the app

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Open the frontend at:

```text
http://localhost:5173
```

## API Overview

The backend exposes note CRUD routes under `/api/notes`:

- `GET /api/notes`
- `GET /api/notes/:id`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Notes

This project is a lightweight full-stack app designed for portfolio use and local development. It demonstrates a clean separation between frontend and backend responsibilities while keeping the codebase simple and easy to extend.

## License

ISC
