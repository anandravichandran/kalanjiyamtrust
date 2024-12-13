import express from "express";
import {  addCarouselImages, addMembers, changeAdminCredential } from "../controller/adminActivitiesController.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../config/multer.js";



const adminActivityRouter = express.Router();



adminActivityRouter.post("/change-credential",authMiddleware,changeAdminCredential);
adminActivityRouter.post("/carousel-images",authMiddleware,upload,addCarouselImages);
adminActivityRouter.post("/add-members",authMiddleware,upload,addMembers);





export default adminActivityRouter;