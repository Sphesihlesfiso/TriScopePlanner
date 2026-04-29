"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const db_1 = require("config/db");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const home_routes_1 = __importDefault(require("routes/home.routes"));
const auth_routes_1 = __importDefault(require("routes/auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "https://tri-scope-planner.vercel.app/",
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const port = parseInt(process.env.PORT || "3000", 10);
app.use((req, res, next) => {
    console.log("➡️", req.method, req.url);
    next();
});
app.use("/", home_routes_1.default);
app.use("/auth", auth_routes_1.default);
const startServer = async () => {
    try {
        await db_1.dataBase.connect();
        app.listen(port, () => {
            console.log(`Server running on port http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(error);
        console.log("Server failed to start due to database connection.");
    }
};
startServer();
