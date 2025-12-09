import { Router } from "express";
import {
  addUserTask,
  replaceTask,
  deleteTaskById,
  editTask,
} from "../controllers/homeControler";
import { queryFromDb } from "../middleware/dbQueries";

const router = Router();
router.get("/", queryFromDb);
router.post("/task", addUserTask);
router.delete("/task/:id", deleteTaskById("tasks"));
router.put("/task/:id", replaceTask);
router.patch("/task/:id", editTask);

export default router;
