
import express from "express"
import { verifyToken } from "../../utils/jwtToken.js";

const productsRouter = express.Router();

productsRouter.get("/products",verifyToken,async (req,res)=>{
    res.send("list of products")
})

export default productsRouter;