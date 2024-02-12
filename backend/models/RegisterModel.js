import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const RegisterDB = db.define('register',{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type:DataTypes.INTEGER,
    },
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.VARCHAR(100)
    },
    password:{
        type: DataTypes.VARCHAR(20)
    },
    phoneno:{
        type: DataTypes.INTEGER
    },
    created:{
        type: DataTypes.NOW
    },
    last_login:{
        type: DataTypes.NOW
    },
   
},{
    freezeTableName:true,
    timestamps: false
});

export default RegisterDB;