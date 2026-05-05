import { Router } from 'express';
import { getZones, reportOutage, restorePower } from '../controllers/zones.controller';

const router = Router();

router.get('/', getZones);
router.post('/report', reportOutage);
router.post('/restore', restorePower);

export default router;
