import { Prisma } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import express from "express"
import {hashPassword} from "../../utils/hashPassword.js";
import { verifyPassword } from "../../utils/verifyPassword.js";
import { generateToken } from "../../utils/jwtToken.js";
const router = express.Router()
const prisma = new PrismaClient();

router.get("/",(req,res)=>{
    res.send("Hello world")
})

router.post("/register",async(req,res)=>{
    const {firstname,lastname,email,password} = await req.body;

    const hashed = await hashPassword(password);
    // console.log(hashed)

    await prisma.user.create({data:{firstname,lastname,email,password:hashed}})

    res.send("added successfully")
})

router.post("/login",async (req,res)=>{
    const {email,password} = await req.body;
    try{
    const user = await prisma.user.findUnique({where:{email}});

    if(!user){
        return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      const token = generateToken(user.id);

      res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
        maxAge: 3600000, 
        sameSite: "strict", // Prevents the cookie from being sent in cross-site requests
      });
  
      res.status(200).json({ 
        message: "Login successful", token  });
    } 
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to log in" });
    }
})




export default router;