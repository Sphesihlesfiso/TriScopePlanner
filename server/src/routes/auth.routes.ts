import {
  registerUser,
  signInUser,
  signOut,
} from "@controllers/auth.controller";
import "../middleware/passport.middleware"; // MUST run before routes

import { Router } from "express";

const router = Router();
router.post("/register", registerUser);
router.post("/sign-in",signInUser)
router.post("/sign-out",signOut)

export default router;
