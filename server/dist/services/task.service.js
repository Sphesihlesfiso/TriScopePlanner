"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.fetchTask = exports.fetchTasks = exports.createTask = void 0;
const db_1 = require("config/db");
const createTask = async (task, userId) => {
    try {
        const { scope, title, description, startTime, endTime, date } = task;
        const results = await db_1.dataBase.query(`INSERT INTO tasks (scope,title, description, "startTime", "endTime", "userId",date)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`, [scope, title, description, startTime, endTime, userId, date]);
        return results.rows[0];
    }
    catch (error) {
        throw {
            message: "Failed to create task",
            error,
        };
    }
};
exports.createTask = createTask;
const fetchTasks = async (userId) => {
    try {
        const results = await db_1.dataBase.query(`SELECT * FROM tasks WHERE "userId"=$1`, [userId]);
        return results.rows;
    }
    catch (error) {
        console.error("fetchTasks service failed:", error);
        throw {
            message: "Failed to fetch tasks",
            error,
        };
    }
};
exports.fetchTasks = fetchTasks;
const fetchTask = async (taskId) => {
    try {
        const results = await db_1.dataBase.query(`SELECT * FROM tasks WHERE "taskId"=$1`, [taskId]);
        return results.rows;
    }
    catch (error) {
        console.error("fetchTask service failed:", error);
        throw {
            message: "Failed to fetch task",
            error,
        };
    }
};
exports.fetchTask = fetchTask;
const updateTask = async (task, taskId) => {
    try {
        const { scope, title, description, startTime, endTime, date } = task;
        const result = await db_1.dataBase.query(`UPDATE tasks SET scope=$1,
           title=$2,
           description=$3,
           "startTime"=$4,
           "endTime"=$5,
           date=$6 WHERE "taskId"=$7 RETURNING *`, [scope, title, description, startTime, endTime, date, taskId]);
        return result.rows[0];
    }
    catch (error) {
        console.error("updateTask service failed:", error);
        throw {
            message: "Failed to update task",
            error,
        };
    }
};
exports.updateTask = updateTask;
const deleteTask = async (taskId) => {
    try {
        console.log(`Delete route service`);
        await db_1.dataBase.query(`DELETE FROM tasks WHERE "taskId"=$1`, [taskId]);
    }
    catch (error) {
        console.error("deleteTask service failed:", error);
        throw {
            message: "Failed to delete task",
            error,
        };
    }
};
exports.deleteTask = deleteTask;
