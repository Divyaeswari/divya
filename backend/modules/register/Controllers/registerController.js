
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from "sequelize";
import bcrypt from 'bcrypt';

const { json } = bodyParser;
const app = express();
app.use(json());

import RegisterDB from '../../../models/RegisterModel.js';

const Op = sequelize.Op;

//const { create } = RegisterDB;

export const registerUser = async (req, res) => {
    const { username, email, password, phoneno, dateOfBirth } = req.body;

    console.log('req.body');
    console.log(req.body);

    try {
        // console.log('existingUser123');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the email or phone number already exists in the database
        const existingUser = await RegisterDB.findOne({
            where: {
                [Op.or]: [{email: email}, {phoneno: phoneno}]
                // $or: [
                    
                //     { email: email },
                //     { phoneno: phoneno }
                // ]
            }
        });
       

        if (existingUser) {
            return res.status(400).json({ error: 'Email or phone number already exists' });
        }

        // Create a new record in the Register table
        const newRegistration = await RegisterDB.create({
            username: username,
            email: email,
            password: hashedPassword,
            phoneno: phoneno,
            dateOfBirth: dateOfBirth,
            role: 'user'
        }); 
        console.log(newRegistration.toJSON());

        console.log('Registration successful:', newRegistration);

        // Send a success response
        res.status(200).json({ success: 'Registration successfully Done!' });
    } catch (error) {
        console.error('Error registering user:', error);
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};
