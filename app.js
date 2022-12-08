import express from "express";
import * as dotenv from "dotenv";
import dbConnect from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import uploadImgRouter from "./routes/uploadImg.routes.js";
import cors from "cors";

dotenv.config();

dbConnect();

const app = express();
// configuração da origin da aplicação react
app.use(cors({ origin: process.env.REACT_URL }));
app.use(express.json());

// 8080/user/register
app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/", uploadImgRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`server on port ${process.env.PORT}!'`)
);
