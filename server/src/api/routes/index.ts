import { Router } from "express";
import {addUserTask}  from '../controllers/homeControler';
import { queryFromDb,deleteTaskById} from "../middleware/dbQueries";

const router =Router();
router.get("/",queryFromDb("tasks"));
router.post("/task",addUserTask)
router.delete("/user/task/:id",deleteTaskById("tasks"))

export default router