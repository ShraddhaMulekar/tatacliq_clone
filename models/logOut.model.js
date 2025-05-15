import mongoose from "mongoose";

const logOutSchema = new mongoose.Schema({
    token :{type:String, required:true},
    time : {type:Date, default:Date.now}
}, {
    versionKey:false
})

const logOutModel = mongoose.model("logout", logOutSchema)

export default logOutModel