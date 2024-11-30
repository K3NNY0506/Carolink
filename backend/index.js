import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { sequelize } from './models/posts.js';  // Import sequelize for database sync

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow your React client
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add 'OPTIONS' to allow preflight requests
  allowedHeaders: ['Content-Type', 'Authorization', 'accessToken'], // Allow headers including 'accessToken'
  credentials: true, // Allow credentials like cookies (if needed)
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Middleware to handle preflight OPTIONS requests
app.options('*', cors(corsOptions));  // Handle preflight for all routes

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.use(express.json());

// Routers
import postRouter from './routes/posts.js';  // Import posts router
app.use("/posts", postRouter);

// Authenticate database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');

    // Sync database and start server
    sequelize.sync({ alter: true }).then(() => {
      console.log('Database synced successfully.');
      app.listen(3002, () => {  // Changed to port 3002
        console.log("Server running on port 3002");
      });
    }).catch((err) => {
      console.error('Error syncing the database:', err);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
