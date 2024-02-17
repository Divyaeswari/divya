import express from "express";
import { ResetPassword } from "./Controllers/resetPasswordController.js";


// const app = express();
const router = express.Router();

router.post('/resetPassword', ResetPassword);



export default router;