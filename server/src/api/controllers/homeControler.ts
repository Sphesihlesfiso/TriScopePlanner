import {Request,Response} from "express";
import {dataBase} from "../../config/db"

export const getUserTasks =async (req:Request,res:Response) =>{
    try {
        const result =await dataBase.query("SELECT * FROM tasks");
        
        res.json(result.rows);
    } catch (error) {
        res.status(404).json({message:"Failed to get user tasks"})
    }
}
export const addUserTask =async (req:Request,res:Response) =>{
    const {scope,tittle,description}=req.body;
    
    try{
        const result=await dataBase.query("INSERT INTO tasks (scope,tittle,description,end_time) VALUES($1,$2,$3,$4)",
            [scope,tittle,description,2])
    }catch(error) {
        res.status(201).json({message:"Failed to put task into db."})
    }  
}
export const getAllUsers =async(req:Request,res:Response) =>{
    try {
        const result =await dataBase.query("SELECT * FROM users");
        
        res.json(result.rows);
    }catch(error){
        res.status(500).json({message:"Cant get users"})
    }
}
