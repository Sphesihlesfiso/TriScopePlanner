import { Router } from "express";

import {
  deleteUserTask,
  getAllTasks,
  getTask,
  postTask,
  updateUserTask,
} from "@controllers/task.controller";
const router = Router();
router.get("/user/task/:taskId", getTask); // specific first
router.get("/user/:userId", getAllTasks); // dynamic last
router.post("/post/:userId", postTask);
router.delete("/delete/task/:taskId", deleteUserTask);
router.patch("/:taskId", updateUserTask);
export default router;
