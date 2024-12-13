import adminModel from "../model/adminModel.js";
import axios from "axios"
import bcrypt from "bcryptjs"





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





// 



























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