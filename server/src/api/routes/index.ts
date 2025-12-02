import { Router } from "express";
import {addUserTask,}  from '../controllers/homeControler';
import { queryFromDb} from "../middleware/dbQueries";

const router =Router();
router.get("/",queryFromDb("tasks"));
router.post("/task",addUserTask)
// router.delete("/user/task:id",deleteUpdateItembyId("tasks",1,"DELETE"))

export default router