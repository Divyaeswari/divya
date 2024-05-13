
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from "sequelize";
import RegisterDB from '../../../models/RegisterModel.js';
import session from 'express-session';
import SequelizeSessionStore from 'connect-session-sequelize';
import db from '../../../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
   

const { json } = bodyParser;
const app = express();
app.use(json());

const Op = sequelize.Op;

//const { create } = RegisterDB;
const SequelizeStore = SequelizeSessionStore(session.Store);

const sequelizeStore = new SequelizeStore({
    db: db,
});

// npm install uuid
//const { v4: uuidv4 } = require('uuid');
// const secretKey = uuidv4();
// console.log(secretKey);




// Configure sequelizeStore to sync sessions with the database
sequelizeStore.sync();



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('req.body');
    console.log(req.body);

    try {
        //console.log('existingUser123');
        // Check if the email or phone number already exists in the database
        

        const checkEmailExists = await RegisterDB.findOne({
            where: { email: email }
        });
    
        if (!checkEmailExists) {    
            // Email doesn't exist, send alert response
            res.status(400).json({ error: 'Email Wrong or Email not registered.' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, checkEmailExists.password);

        // const checkExists = await RegisterDB.findOne({
        //     where: {
        //         [Op.and]: [{email: email}, {password: password}]
        //     }
        // });
       

        if (passwordMatch) { 
            const user = {email: checkEmailExists.email, id: checkEmailExists.id, name:checkEmailExists.username, role:checkEmailExists.role};

            const sessData = req.session = user;

            console.log(sessData)
            //const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ success: 'Login successfully!',user: sessData});
        }
        else{
            res.status(401).json({ error: 'Incorrect password. Please try again.' });
        }
    }
        catch (error) {
        console.error('Error Logging In:', error);
        console.log('existingUser');
        // Send an error response
        res.status(500).json({ error: 'Internal server error' });
    }
};


