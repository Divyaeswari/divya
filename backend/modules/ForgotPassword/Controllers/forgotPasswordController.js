import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import sequelize from "sequelize";
import OTPLogs from '../../../models/OTPLogsModel.js';
import RegisterDB from '../../../models/RegisterModel.js';
const { json } = bodyParser;

const app = express();
app.use(json());

// Route to handle sending OTP via email
export const ForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {

        const checkEmailExists = await RegisterDB.findOne({
            where: { email: email }
        });
    
        if (!checkEmailExists) {
            // Email doesn't exist, send alert response
            res.status(400).json({ error: 'Email Wrong or Email not registered.' });
            return;
        }
        else{
            // Generate OTP (you can use any library for generating OTP)
            const otp = Math.floor(100000 + Math.random() * 900000);

            // Nodemailer configuration for sending emails
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'bharathieswari00@gmail.com', // Your Gmail email address
                    pass: 'sksg bzsh iqqu zxzc' // Your Gmail password(This is my App Password) The App created in 2step 
                }
            });

            //Step1: Open this link https://myaccount.google.com/security

            // Step2: Enable 2 factor authentication

            // Click on App passwords just below the 2 factor authentication

            // Update after July 2023-> There is a change in the 3rd step, i.e. App passwords can be found at the bottom of the page of the Two-Factor Authentication screen.

            // From Select App options select Other and write your app name it could be any name like mycustomapp

            // It will generate you the password copy the password from the popup and use the following code.

            // Use that copied password in the auth password section of the code

            const mailOptions = {
                from: 'bharathieswari00@gmail.com',
                to: email,
                subject: 'Password Reset OTP',
                text: `Your OTP for password reset is: ${otp}`
            };

            // Send email with OTP
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error sending email:', error);
                    return res.status(500).json({ error: 'Failed to send OTP' });
                } else {
                    console.log('Email sent:', info.response);
                    // Send success response with OTP
                    return res.status(200).json({ otp: otp });
                }
            });

            const saveOTPLogs = await OTPLogs.create({
                email: email,
                otp: otp,
            }); 
            console.log(saveOTPLogs.toJSON());
    
            console.log('OTP Logs Saved successfully:', saveOTPLogs);
    
            // Send a success response
           // res.status(200).json({ success: 'Registration successfully Done!' });
        }
    }
        catch (error) {
        console.error('Error Logging In:', error);
        console.log('existingUser');
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
        }

};