import mongoose from "mongoose";

const db = async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log('MongoDB is Connected');
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/Vyra`)

}

export default db;
