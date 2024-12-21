import bcrypt from "bcryptjs";
import adminModel from "../model/adminModel.js";
import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js";
import axios from "axios"
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();


const otpStore = {};


export const adminLogin = async(req,res)=>{


    const {userName,password} = req.body;
   
    try {
        
        const admin = await adminModel.findOne({userName:userName});

        if(!admin){
            return res.json({success:false,message:"User Name Not Found !"});
        }
       
        const isMatch = await bcrypt.compare(password,admin.password);

        if(!isMatch){
            return res.json({success:false,message:"Password Does't Match !"})
         }

         if(admin && isMatch){
           
            const token = generateToken(admin._id,process.env.ADMINSECRETKEY);
            const encryptedToken = setEncryptedToken(token);

           return res.json({success:true,message:"Login successful !",encryptedToken:encryptedToken});
         }

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Failed To SignIn !"});
    }

};



export const verify = async (req, res) => {

    try {
            const { userName, password } = req.body;

            // Check for admin
            const admin = await adminModel.findOne({ userName });
            if (!admin) {
                return res.status(404).json({ success: false, message: "Username not found!" });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Incorrect password!" });
            }

            // Fetch admin email for OTP
            const { email } = admin; // Assuming `email` is a field in the admin schema

            // Send OTP
            const otpSent = await sentOTP(email, userName,"admin_login");
            
            if (otpSent) {
                return res.status(200).json({ success: true, message: "OTP sent successfully to your registered email!",email:email });
            } else {
                return res.status(500).json({ success: false, message: "Failed to send OTP. Please try again later." });
            }
        
    } catch (error) {
        console.error("Error in verify function:", error);
        return res.status(500).json({ success: false, message: "An internal server error occurred." });
    }
};




// CONTROLLER FOR FORGOT-PASSWORD

export const forgotPassword = async(req,res)=>{

    const {email} = req.body;
  
    if (!(await validateEmailWithIPQS(email))) {
        return res.status(400).json({ success: false, message: "Please enter a valid email!" });
    }
    try {
        
          const user = await adminModel.findOne({email});
        

        if(!user){
            return res.json({success:false,message:"This Email Is Not Registered. Please Try Again"})
        }else{
           
           if(sentOTP(email,user.name,"forgot_password")){
                    res.json({success:true,message:"OTP has been successfully sent to your registered email address"});  
           }else{
                    res.json({success:false,message:"Failed To Send OTP"});     
           }
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something Wrong In Sent OTP !"})
    }

}


// VERIFY OTP

export const verifyOTP = async(req,res)=>{

    try {
    
    const{otp,email} = req.body;
  console.log({otp,email})
    const storedOtp = otpStore[email];
    const{OTP,expireTime} = storedOtp;
    
    if(Date.now() > expireTime && OTP==otp){
        return res.json({success:false,message:"Your OTP has expired !"});
    }

   if(OTP != otp){
      return res.json({success:false,message:"Oops! The OTP you entered is incorrect"})
    }else{
        delete otpStore[email];
    }
    
    return res.json({success:true,message:"OTP verified successfully!"})
        
} catch (error) {
        console.log(error.message);
        return res.json({success:false,message:"error occured,Please try later"})
}
 }


// CONTROLLER FOR RESET-PASSWORD 


export const resetPassword = async(req,res)=>{

    const{newPassword,comfirmPassword,email} = req.body;
  
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(newPassword !== comfirmPassword){
        return res.json({success:false,message:"Pasword Does't Match !"})
    }else{
        if (!strongPasswordRegex.test(newPassword)) {
            return res.status(400).json({ success: false, message: "Your password is too weak. Please include uppercase, lowercase letters, numbers, and a special character." });
        }

        try {

             const user = await adminModel.findOne({email});

            const salt = await bcrypt.genSalt(10);
            const newHashedPassword =  await bcrypt.hash(newPassword,salt);
            
            user.password = newHashedPassword;
            
            await user.save();
            
            res.json({success:true,message:"Your password has been updated successfully !"})
            
            
        } catch (error) {
            console.log(error);
            return res.json({success:false,message:"Failed To Update Password !"});

        }
    }
    
}


































// FUNCTION FOR GENERATE JWT TOKEN

export const generateToken = (id,SECRET_KEY)=>{

    return jwt.sign({id},SECRET_KEY,{
       expiresIn:"24h"
    });
}

// EXTRA ENCRYPTING THE TOKEN

export function setEncryptedToken(token) {
    const encryptedToken = CryptoJS.AES.encrypt(token, process.env.SECRETKEY2).toString();
    return encryptedToken;
  }


// Email Templete

  const getEmailTemplate = (type, email, name, OTP) => {
    let subject, text;

    switch (type) {
        case 'forgot_password':
            subject = 'Password Reset Request';
            text = `
                Dear ${name},
                
                We received a request to reset your password. Please use the following One-Time Password (OTP) to reset it:
                
                OTP: ${OTP}
                
                This OTP is valid for the next 5 minutes. Please do not share this OTP with anyone for your security.

                If you did not request this, please contact our support team immediately.

                Best regards,
                The Kalanjiyam Trust Team
            `;
            break;

        case 'admin_login':
            subject = 'Admin Login OTP for Kalanjiyam Kalyana Malai';
            text = `
                Dear Admin,
                
                We received a login request for your admin account at Kalanjiyam Trust. Please use the following One-Time Password (OTP) to log in:
                
                OTP: ${OTP}
                
                This OTP is valid for the next 5 minutes. Please do not share this OTP with anyone for your security.

                If you did not initiate this login request, please contact support immediately.

                Best regards,
                The Kalanjiyam Trust Team
            `;
            break;

        default:
            throw new Error('Unknown email type');
    }

    return { subject, text };
};

// Main function to send OTP based on the email type
const sentOTP = async (email, name, type) => {
    // OTP GENERATION
    const OTP = generateOTP(5);
    const expireTime = Date.now() + 300 * 1000;
    otpStore[email] = { OTP, expireTime };

    // Get email template based on the type
    const { subject, text } = getEmailTemplate(type, email, name, OTP);

    // NODEMAILER CONFIG
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILERUSER,
            pass: process.env.NODEMAILERPASS,
        },
    });

    const mailOption = {
        from: process.env.ADMINEMAIL,
        to: email,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOption);
        console.log({ OTP, expireTime });
        return true; // OTP sent successfully
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        return false; // Failed to send OTP
    }

}



// FUNCTION FOR OTP GENERATION

const generateOTP = (length)=>{
    let otp = "";
    for(let i =0;i<length;i++){
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}







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