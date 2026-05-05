import { Request, Response } from 'express';
import { pool } from '../db';

export const getZones = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM zones');
    res.json(rows);
  } catch (error) {
    console.error('❌ Error fetching zones:', error);
    res.status(500).json({ error: 'Error fetching zones' });
  }
};

export const reportOutage = async (req: Request, res: Response) => {
  const { zoneId } = req.body;
  if (!zoneId) {
    return res.status(400).json({ error: 'zoneId is required' });
  }

  try {
    console.log(`Reporting outage for zone: ${zoneId}`);
    await pool.query('INSERT INTO reports (zoneId, type) VALUES (?, "outage")', [zoneId]);
    await pool.query('UPDATE zones SET status = "off" WHERE id = ?', [zoneId]);
    res.json({ message: 'Outage reported and status updated' });
  } catch (error) {
    console.error('❌ Error reporting outage:', error);
    res.status(500).json({ error: 'Error processing report' });
  }
};

export const restorePower = async (req: Request, res: Response) => {
  const { zoneId } = req.body;
  if (!zoneId) {
    return res.status(400).json({ error: 'zoneId is required' });
  }

  try {
    console.log(`Restoring power for zone: ${zoneId}`);
    await pool.query('INSERT INTO reports (zoneId, type) VALUES (?, "restored")', [zoneId]);
    await pool.query('UPDATE zones SET status = "on" WHERE id = ?', [zoneId]);
    res.json({ message: 'Power restoration reported and status updated' });
  } catch (error) {
    console.error('❌ Error restoring power:', error);
    res.status(500).json({ error: 'Error processing restoration' });
  }
};
