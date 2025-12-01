import {Pool} from "pg"
import dotenv from "dotenv"
dotenv.config()
export const dataBase =new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST ,
    database: process.env.DB_NAME ,
    password: process.env.DB_PASSWORD || "1910",
    port: Number(process.env.DB_PORT),
})
