import express from "express";
import connectDB from "./config/db.js";
import adminAuthRouter from "./routes/userRoute.js";
// import adminModel from "./model/adminModel.js";
// import bcrypt from "bcryptjs"


const app = express();
const PORT = 5000;


// CONNECT DB

connectDB()


// MIDDLEWARE

app.use(express.json())


// ROUTES


app.use("/api/admin",adminAuthRouter);



// CREATE THE SERVER

app.listen(PORT,()=>{
    console.log(`Server start at http://localhost:${PORT}`)
})









// ADD ADMIN 

// app.post("/api/register",async(req,res)=>{

//     const {userName,password,gmail}=req.body;
   
//     const getSalt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,getSalt);

//     const newData = adminModel({
//         userName,
//         gmail,
//         password:hashedPassword
//     })
//    await newData.save();
//   if(newData) res.json({success:true,message:"ok!"});
// })