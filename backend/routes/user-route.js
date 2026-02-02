import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { loginUser , logoutUser, changePassword} from "../controllers/user.controllers.js";

import { auth } from "../middleware/auth.js";
  

const router = Router(); 



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.put("/change-password", auth, changePassword)

export default router; 