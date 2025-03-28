import userdb from "../models/userModel.js";
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login 
const loginUser = async () =>{
    try{
        const {email,password} = req.body;
        const user = await userdb.findOne({email});
        if(!user){
            return res.json({success:false,message:"user doesnot  exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}

//Route for user register
const registerUser = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        //Checking User Already exists
        const exists = await userdb.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"PLease enter a valid email"})
        }
        if(password.length < 8 ){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userdb({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success:true,token})

    }catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for admin login
const adminLogin = async(req,res)=>{
    try {
        const { email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"invalid credentials"})
        }
    } catch (error) {
        
    }

}

export { loginUser , registerUser , adminLogin}