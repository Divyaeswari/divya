import express from "express";
import registerRouter from "../modules/register/registerRoutes.js";
import loginrouter from "../modules/login/loginRoutes.js";
import  ForgotPasswordRouter from "../modules/ForgotPassword/forgotPasswordRoutes.js";
import ResetPasswordRouter from "../modules/ResetPassword/resetPasswordRoutes.js";



const router = express.Router();


export default [registerRouter,loginrouter,ForgotPasswordRouter,ResetPasswordRouter, router]; 