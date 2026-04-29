"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("@controllers/auth.controller");
require("../middleware/passport.middleware"); // MUST run before routes
const express_1 = require("express");
const auth_controller_2 = require("@controllers/auth.controller");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_1.registerUser);
router.post("/sign-in", auth_controller_1.signInUser);
router.post("/verify-email", auth_controller_1.verifyUserEmail);
router.post("/forgot-passoword", auth_controller_2.sendPasswordresertEmail);
router.post("/reset-password/:resertToken", auth_controller_1.makeNewUserPassword);
router.post("/sign-out", auth_controller_1.signOut);
exports.default = router;
