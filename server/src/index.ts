import express, { Request, Response } from "express";
import apiRoutes from "./api/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = parseInt(process.env.SERVER_PORT || "3000", 10);
app.use("/", apiRoutes);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
