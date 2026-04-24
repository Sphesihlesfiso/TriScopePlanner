import { verify } from 'crypto';
import {
  registerUser,
  signInUser,
  signOut,
  verifyUserEmail,
} from "@controllers/auth.controller";
import "../middleware/passport.middleware"; // MUST run before routes

import { Router } from "express";

const router = Router();
router.post("/register", registerUser);
router.post("/sign-in",signInUser)
router.post("/verify-email", verifyUserEmail);
router.post("/reset-password")
router.post("/sign-out",signOut)

export default router;
