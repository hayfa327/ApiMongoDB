const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const {
  createPerformance,
  getAllPerformances,
  getPerformanceById,
  updatePerformance,
  deletePerformance,
} = require('../controllers/performanceController');
 
router.post('/create', auth, isAdmin, createPerformance);
router.get('/all', getAllPerformances); // supports ?type=performance or ?type=concert
router.get('/:id', getPerformanceById);
router.put('/:id', auth, updatePerformance);
router.delete('/:id', auth, isAdmin, deletePerformance);
 
module.exports = router;
 