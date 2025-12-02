import express,{Request,Response} from "express"
import apiRoutes from "./api/routes"
import dotenv from "dotenv"
dotenv.config();
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port  = parseInt(process.env.SERVER_PORT || "3000",10)
app.use("/api",apiRoutes)

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})