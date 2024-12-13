import express from "express";
import { changeAdminCredential } from "../controller/adminActivitiesController.js";
import authMiddleware from "../middleware/auth.js";



const adminActivityRouter = express.Router();



adminActivityRouter.post("/change-credential",authMiddleware,changeAdminCredential);







export default adminActivityRouter;