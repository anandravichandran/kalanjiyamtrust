import adminModel from "../model/adminModel.js";
import axios from "axios"
import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js";





// CONTROLLER FOR CHANGE ADMIN CREDENTIAL




export const changeAdminCredential = async(req,res)=>{

    const user_id =  req.id;

    const {userName,password,email} = req.body;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
try {

  if (!(await validateEmailWithIPQS(email))) {
    return res.status(400).json({ success: false, message: "Please enter a valid email!" });
}


  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({ success: false, message: "Your password is too weak. Please include uppercase, lowercase letters, numbers, and a special character." });
}
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const newCredential = {
          userName:userName,
          password:hashedPassword,
          email:email
    };

    const admin = await adminModel.findByIdAndUpdate(user_id,newCredential, { new: true } );

    if(admin){
        res.json({success:true,message:"Credential Changed "});

    }else {
        res.json({ success: false, message: "Admin not found" });
    }
    
} catch (error) {

    console.log(error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            res.json({success:false, message: 'Validation failed', errors });
          } else {
            res.status(500).json({ message: 'Server error', error: error.message });
          }
}

}





// CONTROLLER FOR ADD CAROSUAL IMAGES


export const addCarouselImages = async (req, res) => {
    try {
        const { files } = req;
        const id = req.id;

        // Validate Admin ID
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid Admin ID" });
        }

        const adminProfile = await adminModel.findById(id);

        // Check if admin data exists
        if (!adminProfile) {
            return res.status(404).json({ success: false, message: "Admin Data Not Found" });
        }

        // Check if files are uploaded
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ success: false, message: "No Files Uploaded!" });
        }

        const imageURLs = {};

        // Helper function to upload an image
        const uploadImage = async (fileKey) => {
            const image = files[fileKey][0];
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "carouselImages" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                ).end(image.buffer);
            });
            imageURLs[fileKey] = result.secure_url;
            adminProfile.carouselImages[fileKey] = result.secure_url;
        };

        // Upload images dynamically
        const imageKeys = ["carouselImage1", "carouselImage2", "carouselImage3"];
        for (const key of imageKeys) {
            if (files[key]) {
                await uploadImage(key);
            }
        }

        // Save updated admin profile
        await adminProfile.save();

        return res.status(200).json({
            success: true,
            message: "Images Uploaded Successfully!",
            data: imageURLs,
        });
    } catch (error) {
        console.error("Error uploading images:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};




























// VALIDATE EMAIL


async function validateEmailWithIPQS(email) {
    const API_KEY = "w0REndl0EIym4aly4naTP21ATEq1p335"; 
    const url = `https://ipqualityscore.com/api/json/email/${API_KEY}/${email}`;
    
    try {
        const response = await axios.get(url);
        const data = response.data;
          
        if (data.success) {
            if (data.valid && !data.disposable) {
                return true
            } else {
                return false;
            }
        } else {
            return "Error in verifying email: " + data.message;
        }
    } catch (error) {
        console.error("API request failed:", error);
        return "Failed to validate the email.";
    }
  }