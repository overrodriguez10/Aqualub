import { Request, Response } from 'express';
import { pool } from '../db';

export const getReports = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(`
      SELECT r.*, z.name as zoneName 
      FROM reports r 
      JOIN zones z ON r.zoneId = z.id 
      ORDER BY r.reportTime DESC 
      LIMIT 20
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Error fetching reports' });
  }
};
