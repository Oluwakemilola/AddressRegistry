import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { DB } from "./database/mongodb.js";
import citizenRouter from "./routes/citizen.route.js"

const app = express()
const PORT = process.env.PORT
app.use(express.json())

app.use("/api/citizen", citizenRouter)

app.listen(PORT, ()=> {
    DB()
    console.log("server is running");
    
})


