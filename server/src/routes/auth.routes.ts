import { verify } from 'crypto';
import {
  makeNewUserPassword,
  registerUser,
 
  signInUser,
  signOut,
  verifyUserEmail,
} from "@controllers/auth.controller";
import "../middleware/passport.middleware"; // MUST run before routes

import { Router } from "express";
import { sendPasswordresertEmail } from '@controllers/auth.controller';

const router = Router();
router.post("/register", registerUser);
router.post("/sign-in",signInUser)
router.post("/verify-email", verifyUserEmail);
router.post("/forgot-password",sendPasswordresertEmail)
router.post("/reset-password/:resertToken",makeNewUserPassword)
router.post("/sign-out",signOut)

export default router;
