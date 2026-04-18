import express from "express";
import { dataBase } from "config/db";
import dotenv from "dotenv";
import cors from "cors";
import homeRoutes from "routes/home.routes"

dotenv.config();
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = parseInt(process.env.SERVER_PORT || "3000", 10);
app.use("/",homeRoutes)
const startServer = async () => {
  try {
    await dataBase.connect();
    app.listen(port, () => {
      console.log(`Server running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    console.log("Server failed to start due to database connection.");
  }
};
startServer();
