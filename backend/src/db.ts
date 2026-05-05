import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a pool that will be exported
export const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const initDB = async () => {
  try {
    // 1. First, connect without a database to ensure it exists
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    await connection.end();

    // 2. Create tables using the existing pool
    await pool.query(`
      CREATE TABLE IF NOT EXISTS zones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status ENUM('on', 'off') DEFAULT 'on',
        lastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        zoneId INT,
        type ENUM('outage', 'restored') DEFAULT 'outage',
        reportTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (zoneId) REFERENCES zones(id)
      )
    `);

    // Ensure the 'type' column exists (in case the table already existed without it)
    try {
      await pool.query("SELECT type FROM reports LIMIT 1");
    } catch (e) {
      console.log('🔄 Adding missing "type" column to reports table...');
      await pool.query("ALTER TABLE reports ADD COLUMN type ENUM('outage', 'restored') DEFAULT 'outage' AFTER zoneId");
    }

    // 3. Seed initial data
    const [rows]: any = await pool.query('SELECT COUNT(*) as count FROM zones');
    if (rows[0].count === 0) {
      await pool.query(`
        INSERT INTO zones (name, status) VALUES 
        ('Barrio Abajo', 'on'),
        ('La Loma', 'on'),
        ('Punta Arena', 'on'),
        ('Bocachica', 'on')
      `);
      console.log('🌱 Initial zones seeded');
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1); 
  }
};
