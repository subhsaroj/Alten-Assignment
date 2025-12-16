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
- Filtering, summary, scrollable table, Critical Vehicle Detection & Alerting.
- Responsive UI.


Source Code (GitHub Links)
Repository:
https://github.com/subhsaroj/Alten-Assignment
Structure:
Alten-Assignment/
   backend/
      fleet-backend/
   frontend/
      fleet-frontend/
   README.md
________________________________________
Requirements Description
Below is a concise set of customer/business requirements derived from the scenario.
Business Requirements
1.	As a fleet operator, I need to view diagnostic events from multiple vehicles so I can monitor issues in real time.
2.	I need to filter diagnostic events based on:
o	Vehicle ID
o	Error Code
o	Severity (Error / Warning / Info)
o	Date range (From / To)
3.	I need a summary view showing:
o	Number of errors per vehicle
o	Top 5 most frequent diagnostic codes
4.	The system must support large event lists with smooth performance.
5.	The UI must be intuitive and responsive for desktop use.
6.	The backend must expose APIs that the frontend can consume reliably.
7.	The solution must be easy to run locally for testing.
Assumptions Made
•	No authentication or user management is required.
•	Diagnostic events are stored in a log file, not in a database.
•	Pagination is handled on the UI and backend for this assignment.
•	Severity values are always one of: ERROR, WARN, INFO.
•	Vehicle IDs and error codes follow a consistent formatting pattern.
________________________________________  Concept / Architecture Description
Backend Concept (NestJS)
Structure & Key Components
•	EventsModule – encapsulates all logic for event handling.
•	EventsController – exposes REST endpoints for:
o	Fetch events with filtering
o	Get summary stats: errors per vehicle, top error codes
•	EventsService – business logic for filtering, aggregation, and transformations.
•	EventsRepository – loads events from a log file (sample.log) into memory.
Data Model
Each event includes:
{
  timestamp: string;
  vehicleId: string;
  level: string;
  code: string;
  message: string;
}
Key Decisions
•	Using NestJS for structured backend architecture.
•	Using in-memory repository backed by a log file for simplicity.
•	Implemented filtering in service layer for clarity and testability.
•	Used DTOs to validate filter parameters.
________________________________________
Frontend Concept (Angular 19)
Main Building Blocks
•	Dashboard View – summary cards + filter panel + events table.
•	Summary Component – shows aggregated stats.
•	Filter Panel Component – handles all filtering inputs.
•	Events Table Component – paginated, scrollable table with sticky headers.
State Management
•	Implemented using Angular Signals:
o	filters – stores filter criteria.
o	events$ – derived signal calling API whenever filters change.
•	Signals were chosen because:
o	They simplify reactive UI.
o	No need for NgRx complexity for a small dashboard.
Data Flow
User Input → FilterPanel → EventsStore → Backend API → Events Table & Summary
UI Decisions
•	Angular Material for consistency and rapid development.
•	Sticky header + scrollable area for large dataset performance.
•	Summary cards use grid layout to stay responsive.
________________________________________
 Features Implemented
•	Full filtering on Vehicle, Code, Severity, Date & Time.
•	Scrollable events table with sticky headers.
•	Summary view:
o	Errors per vehicle
o	Top 5 error codes
•	Pagination and performance improvements.
•	Clean modular structure.
________________________________________
What I Would Do With More Time
•	Add persistence using a real database.
•	Implement live streaming (WebSockets) for real-time events.
•	Add Edit component on each Event in the table and update feature for user
•	Add authentication and user-specific preferences.
•	Add automated tests (unit + integration).
•	Containerize backend & frontend for deployment.
________________________________________
 API Documentation (Swagger)
Swagger is auto-generated via NestJS and available at:
http://localhost:3000/api
Key Endpoints
All endpoints include API model definitions in Swagger.
________________________________________
Critical Vehicle Detection Feature – Overview 
1.	Added a new system capability to detect vehicles in a critical state.
This allows fleet managers to instantly identify high-risk vehicles based on diagnostic event data.
2.	Defined two business rules for determining criticality.
A vehicle is considered critical if it has at least one CRITICAL severity event or if it has repeated ERROR events within a defined time window.
3.	Made the time window configurable by the user.
Instead of a fixed 24-hour or 6-month window, the user can now enter the number of days to look back for repeated errors.
4.	Extended the backend API to accept a days query parameter.
Example:
GET /events/stats/critical-vehicles?days=180
The backend evaluates criticality dynamically based on this user-provided value.
5.	Implemented efficient backend logic to calculate critical vehicles.
Events are grouped per vehicle, critical-level events are detected, and recent errors within N days are counted to determine critical status.
6.	Enhanced the seed generator to ensure meaningful demo data.
Seed data now includes vehicles with CRITICAL events and vehicles with multiple ERROR events so the feature always produces visible results.
7.	Integrated criticality results into the Angular dashboard.
A dedicated “Critical Vehicles” summary card displays all vehicles currently in a critical state.
8.	Added a UI control allowing users to enter the number of days for evaluation.
The dashboard updates automatically when the user applies a new value.
9.	Made the critical summary panel collapsible for better user experience.
This keeps the dashboard clean while giving users quick access to critical insights.
10.	Provides a strong demo point showing dynamic, data-driven insights.
This feature demonstrates the ability to interpret business rules, create configurable logic, and implement full-stack functionality across backend and frontend.

