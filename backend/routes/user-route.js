import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { loginUser , logoutUser, changePassword, getAllUsers , getAllArtists ,addArtist} from "../controllers/user.controllers.js";

import { auth , isAdmin} from "../middleware/auth.js";
  

const router = Router(); 



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.put("/change-password", auth, changePassword)
router.get("/all",  auth, isAdmin, getAllUsers); 
router.get("/artists", getAllArtists); // public route to get all artists
router.post("/artists", auth, isAdmin, addArtist)


export default router; 