import express from "express";
import { adminLogin, forgotPassword, resetPassword, verify, verifyOTP } from "../controller/adminAuthController.js";


const adminAuthRouter = express.Router();

 

adminAuthRouter.post("/login",adminLogin);
adminAuthRouter.post("/verify",verify);
adminAuthRouter.post("/forgot-password",forgotPassword)
adminAuthRouter.post("/reset-password",resetPassword);
adminAuthRouter.post("/verify-otp",verifyOTP);


export default adminAuthRouter;
