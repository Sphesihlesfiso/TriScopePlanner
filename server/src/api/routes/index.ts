import { Router } from "express";
import {getUserTasks,addUserTask,getAllUsers}  from '../controllers/homeControler';

const router =Router();
router.get("/",getUserTasks);
router.post("/task",addUserTask)
router.get("/users",getAllUsers)
export default router