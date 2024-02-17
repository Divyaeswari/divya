import express from "express";
import { ForgotPassword } from "./Controllers/forgotPasswordController.js";


// const app = express();
const router = express.Router();

router.post('/sendOTP', ForgotPassword);



export default router;