import jwt from "jsonwebtoken";
import RegisterDB from "../models/RegisterModel.js";

export const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
    try {
      //get token from  header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //get user from with same id
      req.user = await RegisterDB.findByPk(decoded.id)
      next();
      res.send(token);

    } catch (error) {
      return res.status(401).json({ error: true, message: "Unauthorized access" });
    }
  }
  if (!token) {
    return res.status(401).send({
      error: true,
      message: "No token provided.", 
    });
  }
};