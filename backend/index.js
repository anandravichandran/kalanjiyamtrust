import express from "express";
import connectDB from "./config/db.js";



const app = express();
const PORT = 5000;


// CONNECT DB

connectDB()


// MIDDLEWARE

app.use(express.json())


// CREATE THE SERVER

app.listen(PORT,()=>{
    console.log(`Server start at http://localhost:${PORT}`)
})