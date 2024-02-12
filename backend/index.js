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

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
