import express from 'express';
 import { createExibition , getAllExhibitions,  getExhibitionsByArtist, getExhibitionById, updateExhibition, deleteExhibition} from '../controllers/exhibition.controller.js';
 import { auth } from '../middleware/auth.js';
 import { isAdmin } from '../middleware/auth.js';

const router = express.Router();



router.post('/create', auth, isAdmin, createExibition);
router.get('/all', getAllExhibitions);
router.get('/exhibitions/artist/:artistId', getExhibitionsByArtist); 
router.get("/exhibitions/:id", getExhibitionById);
router.put("/exhibitions/:id", auth, updateExhibition);
router.delete("/:id", auth, isAdmin, deleteExhibition); 


 

export default router;