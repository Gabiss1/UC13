import express, { Application } from "express";

import UserRouter from "./Routes/UserRoutes";

const PORT:number= 3000;
const app: Application = express();

app.use(express.json());
app.use(UserRouter);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});