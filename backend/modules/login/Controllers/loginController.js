
import express from 'express';
import bodyParser from 'body-parser';
import sequelize from "sequelize";
import RegisterDB from '../../../models/RegisterModel.js';
import session from 'express-session';
import SequelizeSessionStore from 'connect-session-sequelize';
import db from '../../../config/database.js';

const { json } = bodyParser;
const app = express();
app.use(json());

const Op = sequelize.Op;

//const { create } = RegisterDB;
const SequelizeStore = SequelizeSessionStore(session.Store);

const sequelizeStore = new SequelizeStore({
    db: db,
});

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    store: sequelizeStore, // Use Sequelize as the session store
    cookie: { secure: false } // In production, set secure: true to ensure cookies are only sent over HTTPS
}));

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
        const checkExists = await RegisterDB.findOne({
            where: {
                [Op.and]: [{email: email}, {password: password}]
            }
        });
       

        if (checkExists) {
            req.session.user = { email: email, id: checkExists.id };
            res.status(200).json({ success: 'Login successfully!' });
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
