"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.replaceTask = exports.addUserTask = void 0;
exports.deleteTaskById = deleteTaskById;
const db_1 = require("../../config/db");
const addUserTask = async (req, res) => {
    const { scope, tittle, description } = req.body;
    try {
        const result = await db_1.dataBase.query("INSERT INTO tasks (scope,tittle,description,end_time) VALUES($1,$2,$3,$4)", [scope, tittle, description, 2]);
        res.status(201).json({
            message: "Task inserted successfully",
            data: { scope, tittle, description }
        });
        console.log(req.body);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to put task into db." });
    }
};
exports.addUserTask = addUserTask;
const replaceTask = async (req, res) => {
    const { id } = req.params;
    const { scope, tittle, description, start_time, end_time } = req.body;
    try {
        const result = await db_1.dataBase.query(`UPDATE tasks SET scope=$1, tittle=$2, description=$3, start_time=$4,end_time=$5 WHERE task_id=${id}`, [scope, tittle, description, start_time, end_time]);
        res.json(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(204).json({ message: `Could not find task with id ${id}` });
    }
};
exports.replaceTask = replaceTask;
const editTask = async (req, res) => {
    const { id } = req.params;
    const { scope, tittle, description, start_time, end_time } = req.body;
    try {
        const result = await db_1.dataBase.query(`UPDATE tasks SET scope=$1, tittle=$2, description=$3, start_time=$4,end_time=$5 WHERE task_id=${id}`, [scope, tittle, description, start_time, end_time]);
        res.json(result.rows);
    }
    catch (error) {
    }
};
exports.editTask = editTask;
function deleteTaskById(tableName) {
    return async (req, res, next) => {
        const id = parseInt(req.params.id);
        try {
            const result = await db_1.dataBase.query(`DELETE FROM ${tableName} WHERE task_id = ${id}`);
            res.json(result.rows);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(404).json({ mesage: `Item with ${id} id not found` });
        }
    };
}
