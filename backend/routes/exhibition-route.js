import express from 'express';
 import { createExibition , getAllExhibitions, getExhibitionsByArtist} from '../controllers/exhibition.controller.js';
 import { auth } from '../middleware/auth.js';
 import { isAdmin } from '../middleware/auth.js';

const router = express.Router();



router.post('/create', auth, isAdmin, createExibition);
router.get('/all', getAllExhibitions);
router.get('/artist/:artistId', getExhibitionsByArtist); 
router.get("/exhibitions/:id", getExhibitionById);


// by artistId
// router.get('/:id', getSingleExhibition);              // get one
// router.put('/:id', auth, isAdmin, updateExhibition);  // update
// router.delete('/:id', auth, isAdmin, deleteExhibition); // delete

export default router;