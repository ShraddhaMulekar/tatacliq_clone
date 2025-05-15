import mongoose from "mongoose";

const LogOutSchema = new mongoose.Schema({
    token :{type:String, required:true},
    time : {type:Date, default:Date.now}
}, {
    versionKey:false
})

const LogOutModel = mongoose.model("logout", LogOutSchema)

export default LogOutModel