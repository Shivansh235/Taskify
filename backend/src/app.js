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

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v2', TaskAPI);
app.use('/api/v1', UserAPI);

// Root route
app.get('/', (req, res) => {
  res.send('Hello from Task Manager API!');
});

// ✅ Export the app instead of listening to a port
export default app;
