# Thinkboard

Thinkboard is a full-stack note-taking application that lets users create, view, edit, and delete notes through a React frontend and an Express/MongoDB backend. The app includes lightweight API rate limiting and a clean, modern UI built with Vite + React + Tailwind.

## Overview

This project is structured as a monorepo with separate frontend and backend folders:

- `frontend/` — React + Vite client application
- `backend/` — Express API server
- Root package scripts — convenience scripts for installing dependencies and building the app

The application is designed around a simple note model:

- Title
- Content
- Created/updated timestamps

## Features

- Create new notes with a title and content
- Browse all notes in a responsive card layout
- Open a note to edit or delete it
- REST API for note management
- MongoDB persistence via Mongoose
- Rate limiting via Upstash Redis-based limiter
- Production-ready frontend serving from the Express backend
- Modern UI with DaisyUI and Tailwind CSS

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- CORS
- Upstash Redis + Rate Limit library

## Project Structure

```text
Thinkboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── upstash.js
│   │   ├── controllers/
│   │   │   └── notesController.js
│   │   ├── middleware/
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   └── Note.js
│   │   ├── routes/
│   │   │   └── notesRoutes.js
│   │   └── server.js
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   └── RateLimitedUI.jsx
│   │   ├── lib/
│   │   │   └── axios.js
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── NoteDetailPage.jsx
│   │   ├── App.jsx
│   ��   ├── index.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package-lock.json
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v18 or newer recommended)
- npm
- MongoDB instance or MongoDB Atlas connection string
- Upstash Redis account and credentials (for rate limiting)

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following values:

```env
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/thinkboard
UPSTASH_REDIS_REST_URL=https://your-upstash-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-token
```

Notes:
- `MONGO_URI` should point to your MongoDB instance.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are required for the rate limiter to work.
- For local development, frontend requests are configured to `http://localhost:5173` via CORS.

## Installation

From the repository root:

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Alternatively, the root `build` script installs dependencies for both apps automatically:

```bash
npm run build
```

## Running the Project

### Development mode

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

The frontend is typically served at:

- `http://localhost:5173`

The backend API is typically served at:

- `http://localhost:5001`

### Production mode

The root project includes a build script that installs dependencies and builds the frontend:

```bash
npm run build
```

Then start the backend:

```bash
npm start
```

When `NODE_ENV=production`, the Express server serves the built frontend from `frontend/dist`.

## API Endpoints

The backend exposes the following note endpoints under `/api/notes`.

### Get all notes

```http
GET /api/notes
```

Returns all notes sorted by newest first.

### Get a single note

```http
GET /api/notes/:id
```

Returns a single note by its MongoDB ObjectId.

### Create a note

```http
POST /api/notes
```

Request body:

```json
{
  "title": "Meeting Notes",
  "content": "Discuss launch planning and QA tasks."
}
```

### Update a note

```http
PUT /api/notes/:id
```

Request body:

```json
{
  "title": "Updated title",
  "content": "Updated content"
}
```

### Delete a note

```http
DELETE /api/notes/:id
```

## Rate Limiting

The backend includes a rate limiter middleware that restricts excessive requests per client key. This helps prevent abuse and protects the note API.

If a client exceeds the limit, the server responds with:

```json
{
  "message": "Too many requests, please try again later"
}
```

with HTTP status `429`.

## Frontend Behavior

The React app includes:

- A home page to list notes
- A create page to add a note
- A detail/edit page for each note
- Toast notifications for success and error feedback
- A rate-limited UI state when the API rejects repeated requests

## Notes on the Current Implementation

This project is a lightweight full-stack app meant for local development and simple note management. It follows a straightforward structure and is suitable as a starting point for further enhancement, including:

- authentication
- markdown support
- note categories/tags
- search and filtering
- user-specific notes
- deployment to a cloud hosting platform

## Root Scripts

The root `package.json` includes helper scripts:

```json
"scripts": {
  "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "npm run start --prefix backend"
}
```

## Contribution

Contributions are welcome. If you plan to improve the application, consider:

- keeping the frontend and backend cleanly separated
- documenting new environment variables
- validating API responses
- testing rate-limiter behavior before deployment

## License

This project currently uses the ISC license as defined in the package metadata.

## Summary

Thinkboard is a compact, practical full-stack note application built with the modern JavaScript stack. It demonstrates a clean separation between frontend and backend responsibilities while remaining easy to run locally and extend over time.

For local use, start the backend and frontend separately, connect a MongoDB instance, and configure the Upstash Redis keys for rate limiting.

