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
// export function deleteUpdateItembyId (tableName:string,itemId:number,operation:string){
//     return async (req:Request,res:Response,next:NextFunction) =>{
//         try {
//             let typeId:string;
//             if (tableName=="users"){
//                 typeId="user_id"
//             }else{
//                 typeId="task_id"
//             }

//             let crud_operatin :string;
//             if (operation==="delete"){
//                 crud_operatin="DELETE"
                
//             }else {
//                 crud_operatin="UPDATE"
//                 }
//                 const result =await dataBase.query(`${crud_operatin} WHERE ${typeId} == ${itemId}`)
//                 res.json(result.rows)

//             }catch (error) {
//                 console.error(error);
//                 res.status(404).json({mesage:`Item with ${itemId} id not found`})
//         }

//     }
// }
