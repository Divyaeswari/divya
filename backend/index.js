import express from "express";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/registerRoute.js";
import test from "./modules/register/registerController.js"

//dotenv.config(); 
const app = express();





// Sequelize Connection
//  db.authenticate().then(() => {
//    console.log('Connection has been established successfully.');
// }).catch((error) => {
//    console.error('Unable to connect to the database: ', error);
// });

app.use(router);
app.use(cors());

var corsOptions = {
    origin: "http://localhost:3000",
    credentials:true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const PORT = process.env.API_BACKEND_PORT || 5000;
const PORT = 5000;
app.listen(PORT, ()=> console.log('http://localhost:3000  FrontEnd Link'));