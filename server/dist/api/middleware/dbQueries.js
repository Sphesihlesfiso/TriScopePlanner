"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFromDb = void 0;
const db_1 = require("../../config/db");
const queryFromDb = async (req, res) => {
    try {
        const result = await db_1.dataBase.query(`SELECT * FROM tasks`);
        res.status(200).json(result.rows);
        console.log(result.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500);
    }
};
exports.queryFromDb = queryFromDb;
