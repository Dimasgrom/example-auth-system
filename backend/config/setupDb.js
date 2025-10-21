const mysql = require('mysql2/promise');
require('dotenv').config();

const initializeDatabase = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    console.log('Successfully connected to MySQL server for setup.');
  } catch (error) {
    console.error('Failed to connect to MySQL server. Please check your .env credentials and ensure MySQL is running.', error);
    process.exit(1);
  }

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' is ready.`);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS \`${process.env.DB_NAME}\`.users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await connection.query(createTableQuery);
    console.log("Table 'users' is ready.");

  } catch (error) {
    console.error('Failed to initialize the database schema:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

module.exports = { initializeDatabase };