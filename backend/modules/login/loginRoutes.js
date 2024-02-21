import express from "express";
import { loginUser } from "./Controllers/loginController.js";
import session from 'express-session';
const app = express();
// app.use(session({
//     secret: 'divya',
//     resave: false,
//     saveUninitialized: true,
//     store: sequelizeStore,
//     cookie: { secure: false }
// }));

// app.use(session({
//     secret: 'ffff',
//     resave: false,
//     saveUninitialized: false
// }));
// const app = express();
const router = express.Router();


router.post('/loginUser', loginUser);

//  router.get('/loginUser', (req,res)=> {
//      const sess1 = req.session = {email:'test@gmail.com',id:'1'};
//     res.send(sess1.id);
// });



export default router;