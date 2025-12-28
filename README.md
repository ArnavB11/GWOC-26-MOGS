# Rabuste Café - Full Stack App

A premium virtual café application built with React, Node.js, and SQLite.

## Features
- **Full Stack Integration**: Persistent data storage with SQLite.
- **Smart Chatbot**: Local recommendation engine (no API key required).
- **Admin Dashboard**: Real-time menu management.
- **Workshop Reservations**: Email notifications via EmailJS.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   cd server && npm install
   ```

2. **Environment Variables**
   Ensure a `.env` file exists in the root directory with:
   ```env
   PORT=5000
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   VITE_EMAILJS_TEMPLATE_ID=...
   ```

3. **Run Application**
   Start both Frontend and Backend with a single command:
   ```bash
   npm run dev:full
   ```
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Architecture
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express.
- **Database**: SQLite (`server/rabuste.db`).
- **Chatbot**: Custom Keyword/Tag matching engine.
