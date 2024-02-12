import express from "express";
import { registerUser } from "./Controllers/registerController.js";


// const app = express();
const router = express.Router();

router.post('/registerUser', registerUser);



export default router;