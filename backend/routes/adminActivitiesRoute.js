import express from "express";
import {  addAndEditEvents, addCarouselImages, addMembers, changeAdminCredential, handleDeleteOperations } from "../controller/adminActivitiesController.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../config/multer.js";



const adminActivityRouter = express.Router();



adminActivityRouter.post("/change-credential",authMiddleware,changeAdminCredential);
adminActivityRouter.post("/carousel-images",authMiddleware,upload,addCarouselImages);
adminActivityRouter.post("/add-members",authMiddleware,upload,addMembers);
adminActivityRouter.post("/handle-events",authMiddleware,upload,addAndEditEvents);
adminActivityRouter.delete("/:type/delete",authMiddleware,handleDeleteOperations);



export default adminActivityRouter;