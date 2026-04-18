import { Router } from "express";
import { fetchTasks } from "@services/task.service";
import {
  deleteUserTask,
  getAllTasks,
  getTask,
  postTask,
  updateUserTask,
} from "@controllers/task.controller";
const router = Router();
router.get("/:userId", getAllTasks);
router.post("/post/:userId", postTask);
router.get("/:taskId",getTask)
router.delete("delete/:taskId", deleteUserTask);
router.patch("update/:taskId", updateUserTask);
export default router;
