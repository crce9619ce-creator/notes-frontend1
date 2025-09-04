# Notes App (React + Vite)

Frontend for the Notes API with CRUD + shareable links.

## Setup
```bash
npm i
cp .env.example .env
# set VITE_API_URL to your deployed backend base URL (e.g., https://notes-fastapi.onrender.com)
npm run dev
```

## Build
```bash
npm run build
```

## Deploy on Vercel
- Import this repo in Vercel
- Set `VITE_API_URL` env var to your backend URL
- Build command: `npm run build`, Output dir: `dist`
