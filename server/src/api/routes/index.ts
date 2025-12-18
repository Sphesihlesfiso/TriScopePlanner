import { Router } from "express";
import {
  addUserTask,
  replaceTask,
  deleteTaskById,
  editTask,
} from "../controllers/homeControler";
import { queryFromDb } from "../middleware/dbQueries";
import { registerUser } from "../controllers/homeControler";
const router = Router();
router.post("/register", registerUser);
router.get("/", queryFromDb);
router.post("/task", addUserTask);
router.delete("/task/:id", deleteTaskById("tasks"));
router.put("/task/:id", replaceTask);
router.patch("/task/:id", editTask);

export default router;
