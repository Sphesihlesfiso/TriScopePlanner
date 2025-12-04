import { Response,Request,NextFunction} from "express"
import { dataBase } from '../../config/db';

export function queryFromDb (tableName:string)  {
    return  async (req:Request,res:Response,next:NextFunction) =>{
        
        try {
            const result = await dataBase.query(`SELECT * FROM ${tableName}`);
            res.status(200).json(result.rows)
            
        } catch(error){
            console.error(error);
            res.status(500).json({mesage:`Table ${tableName} not found`})
        }
    }
}
export function deleteTaskById (tableName:string){
    return async (req:Request,res:Response,next:NextFunction) =>{
        const id =parseInt(req.params.id)
        try {
            const result =await dataBase.query(`DELETE FROM ${tableName} WHERE task_id = ${id}`)
            res.json(result.rows)
            next()

        }catch (error) {
            console.error(error);
            res.status(404).json({mesage:`Item with ${id} id not found`})
        }
    }
}
