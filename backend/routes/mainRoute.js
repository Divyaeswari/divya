import express from "express";
import registerRouter from "../modules/register/registerRoutes.js";



const router = express.Router();


export default [registerRouter, router]; 