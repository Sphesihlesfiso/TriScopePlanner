import {Request,Response} from "express";
import {dataBase} from "../../config/db"


export const addUserTask =async (req:Request,res:Response) =>{
    const {scope,tittle,description}=req.body;
    
    try{
        const result=await dataBase.query("INSERT INTO tasks (scope,tittle,description,end_time) VALUES($1,$2,$3,$4)",
            [scope,tittle,description,2])
        res.status(201).json({
            message: "Task inserted successfully",
            data: { scope, tittle, description }})
    }catch(error) {
        res.status(201).json({message:"Failed to put task into db."})
    }  
}

