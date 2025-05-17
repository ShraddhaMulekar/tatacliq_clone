import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    productId: {type:mongoose.Schema.Types.ObjectId, ref:"product", required:true},
    quantity : {type: Number, default: 1},
    totalPrice : {type: Number},
    status : {type: String},
    createdAt : {type:Date, default:Date.now()}
}, {
    versionKey : false
})

const OrderModel = mongoose.model("order", OrderSchema)

export default OrderModel