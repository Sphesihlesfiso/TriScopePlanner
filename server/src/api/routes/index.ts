import { Router } from "express";
import {
  addUserTask,
  replaceTask,
  deleteTaskById,
  editTask,
  addToGoogleCalender
} from "../controllers/homeControler";
import { queryFromDb } from "../middleware/dbQueries";
import { registerUser } from "../services/registerUser";
import { loginUser } from "../services/loginUser";
const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("googlecalender/task/:id",addToGoogleCalender)
router.get("/", queryFromDb);
router.post("/task", addUserTask);
router.delete("/task/:id", deleteTaskById("tasks"));
router.put("/task/:id", replaceTask);
router.patch("/task/:id", editTask);

export default router;
