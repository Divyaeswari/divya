import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/database.js';
import router from './routes/mainRoute.js';
import registerRouter from './modules/register/registerRoutes.js';

const app = express();

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

//Database connection
db.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// Use routers
app.use(router);
app.use(registerRouter);

app.listen(process.env.DEV_PORT, () => console.log(`Server is running on http://localhost:${process.env.DEV_PORT}`));
