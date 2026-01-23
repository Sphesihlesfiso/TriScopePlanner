import express from "express";

import apiRoutes from "./api/routes";
import dotenv from "dotenv";
import cors from "cors";
import session  from "express-session";
import passport  from "./config/passport"
dotenv.config();
const app = express();
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRoutes);
export default app;