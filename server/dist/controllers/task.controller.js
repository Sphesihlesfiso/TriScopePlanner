"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = exports.updateUserTask = exports.deleteUserTask = exports.postTask = exports.getAllTasks = void 0;
const task_service_1 = require("@services/task.service");
const getAllTasks = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - no userId",
            });
        }
        const usersTasks = await (0, task_service_1.fetchTasks)(userId);
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            payload: usersTasks,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch user tasks in the controller layer",
            payload: null,
        });
    }
};
exports.getAllTasks = getAllTasks;
const postTask = async (req, res) => {
    try {
        const task = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - no userId",
            });
        }
        const newTask = await (0, task_service_1.createTask)(task, userId);
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            payload: newTask
        });
    }
    catch (error) {
        console.error(`Failed to post user tasks ${error}`);
        res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
};
exports.postTask = postTask;
const deleteUserTask = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        await (0, task_service_1.deleteTask)(taskId);
        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    }
    catch (error) {
        console.error(`Failed to delete user task`, error);
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
};
exports.deleteUserTask = deleteUserTask;
const updateUserTask = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        const task = req.body;
        await (0, task_service_1.updateTask)(task, taskId);
        res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    }
    catch (error) {
        console.error(`Failed to update user task`, error);
        res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
};
exports.updateUserTask = updateUserTask;
const getTask = async (req, res) => {
    try {
        const taskId = Number(req.params.taskId);
        const task = await (0, task_service_1.fetchTask)(taskId);
        res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            payload: task,
        });
    }
    catch (error) {
        console.error(`Failed to fetch task`, error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch task",
        });
    }
};
exports.getTask = getTask;
