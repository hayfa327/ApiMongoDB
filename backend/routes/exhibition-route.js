import express from 'express';
 import { createExibition , getAllExhibitions} from '../controllers/exhibition.controller.js';
 import { auth } from '../middleware/auth.js';
 import { isAdmin } from '../middleware/auth.js';

const router = express.Router();



router.post('/create', auth, isAdmin, createExibition);
router.get('/all', getAllExhibitions);

export default router;