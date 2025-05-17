import mongoose from "mongoose";

const AddToCartSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    item : [
        {
            productId : {type:mongoose.Schema.Types.ObjectId, ref:"product", required:true},
            quantity : {type:Number, default: 1}
        }
    ]
}, {
    versionKey : false
})

const AddToCartModel = mongoose.model("addToCart", AddToCartSchema)

export default AddToCartModel