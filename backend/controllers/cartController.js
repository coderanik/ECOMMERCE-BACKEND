import userdb from "../models/userModel.js"


//add products to user cart ,
const addToCart = async (req,res) =>{
    try {
        const { userId, itemId , size} = req.body

        const userData = await userdb.findById(userId)
        let cartData = await userData.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][Size]){
                cartData[itemId][size] += 1
            }
            else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId]={}
            cartData[itemId][size] = 1
        }

        await userdb.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Added to cart"})

        
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})


        
    }

}

//Update user Cart 
const updateCart = async (req,res) =>{
    try {
        const { userId , itemId , size , quantity } = req.body

        const userData = await userdb.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;

        await userdb.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Cart Updated "})
    } catch (error) {

        console.log(error)
        res.json({success:false,message:error.message})
    }

}

const getUserCart = async (req,res) => {
    try {
         const { userId } =req.body
         const userData = await userdb.findbyId(userId)
         let cartData = await userData.cartData;

         res.json({Success:true, cartData})
    } catch (error) {

         console.log(error)
        res.json({success:false,message:error.message})
    }

}

export {addToCart,updateCart,getUserCart}