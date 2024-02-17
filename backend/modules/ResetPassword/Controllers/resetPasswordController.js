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

let users = [
    { email: 'user1@example.com', otp: '', password: 'user1password' },
    { email: 'user2@example.com', otp: '', password: 'user2password' }
];

// Route to handle password reset
app.post('/resetPassword', (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Find the user by email
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Check if the OTP matches
    if (otp !== user.otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Reset password
    user.password = newPassword;

    // Clear OTP
    user.otp = '';

    // Send success response
    res.status(200).json({ message: 'Password reset successfully' });
});

};
