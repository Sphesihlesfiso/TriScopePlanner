import { Router } from "express";
import { getUserTasks } from "../controllers/homeControler";
const router =Router();
router.get("/",getUserTasks);
export default router