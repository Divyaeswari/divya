import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const OTPLogs = db.define('otp_logs', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING
    },
    otp: {
        type: DataTypes.STRING
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// db.sync().then(() => {
//    console.log('Table created successfully!');
// }).catch((error) => {
//    console.error('Unable to create table : ', error);
// });


export default OTPLogs;
