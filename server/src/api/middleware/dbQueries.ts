import { Response,Request,NextFunction} from "express"
import { dataBase } from '../../config/db';

export const queryFromDb = async (req:Request,res:Response)  =>{
   
        
        try {
            const result = await dataBase.query(`SELECT * FROM tasks`);
            res.status(200).json(result.rows)
            
        } catch(error){
            console.error(error);
            res.status(500)
        }
    }

