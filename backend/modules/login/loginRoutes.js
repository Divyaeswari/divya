import express from "express";
import { loginUser } from "./Controllers/loginController.js";


// const app = express();
const router = express.Router();

router.post('/loginUser', loginUser);



export default router;