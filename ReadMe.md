# Task Management App (MERN Stack)

This is a simple full-stack Task Management App built using the MERN stack: MongoDB, Express.js, React.js, and Node.js.

## Features

- User can create a new task with title and description
- User can update/edit tasks
- Tasks can be marked as completed or incompleted
- Tasks can be marked as important or unimportant
- Filter tasks by:
  - All tasks
  - Important tasks
  - Completed tasks
  - Incompleted tasks
- User can delete any task
- User authentication with JWT token
- Fully responsive with mobile first approach.

## Technologies Used

- Frontend: React.js
- Backend: Node.js + Express.js
- Database: MongoDB
- Styling: Tailwind CSS
- State management: Redux
- Authentication: JSON Web Tokens (JWT)
- Toast messages: react-hot-toast

## Folder Structure

- backend/

  - controllers/
  - models/
  - routes/
  - middleware/
  - server.js

- frontend/
  - components/
    - Cards.jsx
    - InputData.jsx
    - Sidebar.jsx
  - pages/
    - AllTasks.jsx
    - CompletedTasks.jsx
    - ImportantTasks.jsx
    - IncompletedTasks.jsx
  - store/
    - auth.js
  - App.jsx

## How to Run the Project

1. Clone the repository  
   `git clone <your-repo-url>`

2. Setup backend

   - Navigate to backend folder  
     `cd backend`
   - Install dependencies  
     `npm install`
   - Create a `.env` file and add your MongoDB URI and JWT secret
   - Run the server  
     `npm start`

3. Setup frontend

   - Navigate to frontend folder  
     `cd frontend`
   - Install dependencies  
     `npm install`
   - Start the React app  
     `npm run dev`

## API Endpoints

- POST /signup → Register user
- POST /login → Login user
- POST /api/v2/create-task → Create a new task
- GET /api/v2/get-all-tasks → Get all tasks
- GET /api/v2/get-imp-tasks → Get important tasks
- PUT /api/v2/update-task/:id → Update a task
- PUT /api/v2/update-comp-task/:id → Mark task as complete/incomplete
- PUT /api/v2/update-imp-task/:id → Mark task as important/unimportant
- DELETE /api/v2/delete-task/:id → Delete a task

## Notes

- Make sure MongoDB is connected and `.env` is set correctly
- LocalStorage is used to store user token and id
- Toast messages show success or error on user actions
- Code is written in a clean and simple style

## Developer

Made by Shivansh Kasaudhan
