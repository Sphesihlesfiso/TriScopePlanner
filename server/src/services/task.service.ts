import { dataBase } from "config/db";

export const createTask = async (task: any, userId: number) => {
  try {
    const { scope, title, description, startTime, endTime, date } = task;

    const results = await dataBase.query(
      `INSERT INTO tasks (scope,title, description, "startTime", "endTime", "userId",date)
       VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [scope, title, description, startTime, endTime, userId, date],
    );
    return results.rows[0]
  } catch (error) {
    throw {
      message: "Failed to create task",
      error,
    };
  }
};

export const fetchTasks = async (userId: number) => {
  try {
    const results = await dataBase.query(
      `SELECT * FROM tasks WHERE "userId"=$1`,
      [userId],
    );

    return results.rows;
  } catch (error) {
    console.error("fetchTasks service failed:", error);

    throw {
      message: "Failed to fetch tasks",
      error,
    };
  }
};

export const fetchTask = async (taskId: number) => {
  try {
    const results = await dataBase.query(
      `SELECT * FROM tasks WHERE "taskId"=$1`,
      [taskId],
    );

    return results.rows;
  } catch (error) {
    console.error("fetchTask service failed:", error);

    throw {
      message: "Failed to fetch task",
      error,
    };
  }
};

export const updateTask = async (task: any, taskId: number) => {
  try {
    const { scope, title, description, startTime, endTime, date } = task;

    const result = await dataBase.query(
      `UPDATE tasks SET scope=$1,
           title=$2,
           description=$3,
           "startTime"=$4,
           "endTime"=$5,
           date=$6 WHERE "taskId"=$7 RETURNING *`,
      [scope, title, description, startTime, endTime, date, taskId],
    );

    return result.rows[0];
  } catch (error) {
    console.error("updateTask service failed:", error);

    throw {
      message: "Failed to update task",
      error,
    };
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    console.log(`Delete route service`)
    await dataBase.query(`DELETE FROM tasks WHERE "taskId"=$1`, [taskId]);
  } catch (error) {
    console.error("deleteTask service failed:", error);

    throw {
      message: "Failed to delete task",
      error,
    };
  }
};