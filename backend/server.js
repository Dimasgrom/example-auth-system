require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { initializeDatabase } = require('./config/setupDb');


const startServer = async () => {
  await initializeDatabase();
  console.log('Database initialization complete.');

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use('/api', authRoutes);
  app.listen(PORT, () => {
    console.log(`Backend server is running at http://localhost:${PORT}`);
  });
};

startServer();
