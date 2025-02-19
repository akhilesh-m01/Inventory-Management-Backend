import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const verifyPassword = async (password,savedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, savedPassword)
        return isMatch;
      } catch (error) {
        throw new Error("Error verifying password");
      }
    
}