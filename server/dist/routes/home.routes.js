"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("@controllers/task.controller");
const verifyToken_1 = require("middleware/verifyToken");
const router = (0, express_1.Router)();
router.get("/user/task/:taskId", task_controller_1.getTask); // specific first
router.get("/user", verifyToken_1.verifyToken, task_controller_1.getAllTasks); // dynamic last
router.post("/post", verifyToken_1.verifyToken, task_controller_1.postTask);
router.delete("/delete/task/:taskId", task_controller_1.deleteUserTask);
router.patch("/patch/task/:taskId", task_controller_1.updateUserTask);
exports.default = router;
