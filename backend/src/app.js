// app.js
import express from 'express';
import connectDB from './connection/conn.js';
import dotenv from 'dotenv';
import cors from 'cors';

import UserAPI from './routes/user.js';
import TaskAPI from './routes/task.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v2', TaskAPI); // Task CRUD routes
app.use('/api/v1', UserAPI); // User routes: login/signup


// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});



// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
