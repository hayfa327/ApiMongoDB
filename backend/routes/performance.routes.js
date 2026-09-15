import express from 'express';
import { auth, isAdmin } from '../middleware/auth.js';
import {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} from '../controllers/performance.controller.js';
 
const router = express.Router();
 
router.post('/create', auth, isAdmin, createPerformance);
router.get('/all', getAllPerformances); // supports ?type=performance or ?type=concert
router.get('/artist/:artistId', getAllPerformances);
router.get('/:id', getPerformanceById);
router.put('/:id', auth, updatePerformance);
router.delete('/:id', auth, isAdmin, deletePerformance);
 
export default router;
 