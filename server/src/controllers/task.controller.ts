import { Request, Response } from "express";
import {
  fetchTask,
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "@services/task.service";
export const getAllTasks = async (req: Request, res: Response) => {
  try {

    const userId = Number(req.params.userId);

    const usersTasks = await fetchTasks(userId);

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      payload: usersTasks,
    });
  } catch (error:any) {
  
    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to fetch user tasks in the controller layer",
      payload: null,
    });
  }
};
export const postTask = async (req: Request, res: Response) => {
  try {
    const task = req.body;
    const userId = Number(req.params.userId);

    await createTask(task, userId);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error(`Failed to post user tasks in the controller layer`, error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};
export const deleteUserTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);

    await deleteTask(taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(`Failed to delete user task`, error);

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
};
export const updateUserTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);
    const task = req.body;

    await updateTask(task, taskId);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error(`Failed to update user task`, error);

    res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
};
export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.taskId);

    const task = await fetchTask(taskId);

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      payload:task
    });
  } catch (error) {
    console.error(`Failed to fetch task`, error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch task",
    });
  }
};
