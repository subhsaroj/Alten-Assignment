# Alten-Assignment
Prerequisites:
- Node 18+, npm 9+, Angular CLI

Backend:
cd backend/fleet-backend
npm install
npm run start
Backend runs on:
http://localhost:3000
Swagger UI:
http://localhost:3000/api

Frontend:
cd frontend/fleet-frontend
npm install
ng serve
Frontend runs on:
http://localhost:4200

Run:
npx ts-node src/seed/seed.ts
This will:
✔ Generate new events
✔ Overwrite sample.log
✔ Print seed generated: XXXX events

Features Implemented:
- Filtering, summary, scrollable table.
- Responsive UI.
