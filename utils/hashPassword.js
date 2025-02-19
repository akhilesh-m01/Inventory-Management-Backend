
import bcrypt, { hash } from "bcryptjs";


export async function hashPassword(password){
    try{
        const hash = await bcrypt.hash(password,10);
        // console.log(hash)
        return hash
    }
    catch(error){
        console.log(`Error: ${error}`)
    }
}
