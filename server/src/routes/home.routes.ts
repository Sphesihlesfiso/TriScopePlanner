import { Router } from "express";

import {
  deleteUserTask,
  getAllTasks,
  getTask,
  postTask,
  updateUserTask,
} from "@controllers/task.controller";
import { verifyToken } from "middleware/verifyToken";
const router = Router();
router.get("/user/task/:taskId", getTask); // specific first
router.get("/user",verifyToken, getAllTasks); // dynamic last
router.post("/post",verifyToken, postTask);
router.delete("/delete/task/:taskId", deleteUserTask);
router.patch("/patch/task/:taskId", updateUserTask);
export default router;
