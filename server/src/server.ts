import express from "express";
import { dataBase } from "config/db";
import dotenv from "dotenv";
import cors from "cors";
import homeRoutes from "routes/home.routes";
import authorization from "routes/auth.routes";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = parseInt(process.env.SERVER_PORT || "3000", 10);




app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);

  next();
});

app.use("/", homeRoutes);
app.use("/auth", authorization);

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
