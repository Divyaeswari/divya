import express from "express";
import test from "../modules/register/registerController.js";

// const app = express();
const router = express.Router();

router.get('/register', test);



export default router;