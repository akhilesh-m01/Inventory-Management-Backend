import jwt from "jsonwebtoken";


export const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });
  return token;
};

export const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
}