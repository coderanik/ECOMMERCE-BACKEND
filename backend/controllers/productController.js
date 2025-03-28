import {v2 as cloudinary } from "cloudinary"
import productdb from "../models/productModel.js";

//Function to add product 

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;


        const image1 = req.files?.image1 ? req.files.image1[0].path : null;
        const image2 = req.files?.image2 ? req.files.image2[0].path : null;
        const image3 = req.files?.image3 ? req.files.image3[0].path : null;
        const image4 = req.files?.image4 ? req.files.image4[0].path : null;

        const images = [ image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subCategory,
            bestSeller:bestSeller === "true" ? true : false ,
            sizes:JSON.parse(sizes),
            image:imagesURL,
            date:Date.now()
        }

        console.log(productData);

        const product = new productdb(productData);
        await product.save()

        console.log(name, description, price, category, subCategory, sizes, bestSeller);
        console.log(imagesUrl);

        res.json({ success: true, message: "Product added successfully"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//function for list product
const listProducts = async (req,res)=>{
    try{
        const products = await productdb.find({});
        res.json({success:true,products})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//function for removing product 
const removeProduct = async (req,res) =>{
    try{
        await productdb.findByIdAndDelete(req.body.id)
        res.josn({success:true,message:"Product Removed"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const singleProduct = async (req,res)=>{
    try {
        const { productId} = req.body
        const product = await productdb.findById(productId)
        res.josn({success:true,product})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

export { listProducts , addProduct , removeProduct , singleProduct}