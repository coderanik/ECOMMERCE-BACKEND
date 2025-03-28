import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import db from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';


//App Config

const  app = express();
const port = process.env.PORT || 4000;
db();
connectCloudinary();

//Middleware

app.use(express.json())
app.use(cors())

//Api Endpoints
app.use('/api/user',userRouter)
app.use('/api/products',productRouter)
app.use('/api/cart',cartRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server is Running on ${port}`)
})