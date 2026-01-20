import { Response, Request } from "express";
import { dataBase } from "../../config/db";

export const queryFromDb = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const result = await dataBase.query(`SELECT * FROM tasks`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};
