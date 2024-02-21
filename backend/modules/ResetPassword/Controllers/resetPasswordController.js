import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import sequelize from "sequelize";
import OTPLogs from '../../../models/OTPLogsModel.js';
import RegisterDB from '../../../models/RegisterModel.js';
const { json } = bodyParser;

const app = express();
app.use(json());


// Simulated database to store user data (for demonstration purposes)

export const ResetPassword = async (req, res) => {

    const { email, otp, password } = req.body;

    try {
        // Retrieve OTP details from the database
        const otpDetails = await OTPLogs.findOne({
            where: { email: email,otp: otp }
        });

        if (!otpDetails) {
            // If no OTP details found, it means OTP hasn't been generated or has expired
            return res.status(400).json({ error: 'OTP not found or expired' });
        }

        // Check if the OTP has expired
        const otpGenerationTime = otpDetails.save_date.getTime();
        const currentTime = new Date().getTime();
        const otpValidityDuration = 60 * 1000; // 60 seconds validity
        const otpAge = currentTime - otpGenerationTime;

        if (otpAge > otpValidityDuration) {
            // If the OTP has expired
            return res.status(401).json({ error: 'OTP expired' });
        }
        else{
            const updatedPassword = await RegisterDB.update(
                { password: password},
                { where: { email: email } }
            );
            return res.status(200).json({ success: 'Password reset successful' });
        }
        
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
