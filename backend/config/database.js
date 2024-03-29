import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const db = new Sequelize(process.env.MYSQL_DB,process.env.MYSQL_USERNAME,process.env.MYSQL_PASSWORD,{
//     host: process.env.MYSQL_HOST,
//     dialect: "mysql"
// });
//RENAME DATABASE nodereactproject TO reactregisterlogin;
// ALTER DATABASE nodereactproject MODIFY NAME = reactregisterlogin



const db = new Sequelize(process.env.DB,process.env.USER,process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: "mysql",
});

console.log(process.env.MYSQL_DB);
export default db;

   
