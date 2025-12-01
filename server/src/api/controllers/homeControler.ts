import {Request,Response} from "express";
import {dataBase} from "../../config/db"

export const getUserTasks =async (req:Request,res:Response) =>{
    try {
        const result =await dataBase.query("SELECT * FROM tasks");
        
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({message:"Failed to get user tasks"})
    }
}