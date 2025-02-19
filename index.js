import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/user/user.route.js'
import productsRouter from './routes/products/route.js';
import cookieParser from "cookie-parser";


dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173'
    ],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use("/",router);
app.use("/",productsRouter);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});