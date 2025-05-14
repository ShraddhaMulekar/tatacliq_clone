import mongoose from "mongoose"

const connectToDB = async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("mongo DB connected!")
}

export default connectToDB