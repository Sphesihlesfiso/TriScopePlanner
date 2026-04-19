import {
  registerUser,
  signInUser,
  signOut,
} from "@controllers/auth.controller";
import  "../middleware/passport.middleware"; // MUST run before routes
import passport from "passport";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/sign-in", (req, res, next) => {
  passport.authenticate("local", (err:any, user:any, info:any) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({ message: "Login failed" });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json({
        success: true,
        message: "Successfully logged-in user",
        user,
      });
    });
  })(req, res, next);
});
router.post("/sign-out", signOut);
export default router;
