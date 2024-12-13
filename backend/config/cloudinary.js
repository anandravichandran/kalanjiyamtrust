import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
if (!process.env.CLOUDINARYCLOUDNAME || 
    !process.env.CLOUDINARYAPIKEY || 
    !process.env.CLOUDINARYAPISECRET) {
    console.error("Missing Cloudinary environment variables");
    process.exit(1); // Exit if critical configuration is missing
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARYCLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
});

export default cloudinary;
