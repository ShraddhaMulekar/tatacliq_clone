import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    brand : {type:String, required:true},
    content : {type:String, required:true},
    price : {type:Number, required:true},
    starRating : {type:String},
    numberRating : {type:Number},
    image : {type:String, required:true},
    category : {type:String, required:true},
    subCategory : {type:String, required:true}
}, {
    versionKey : false
})

const ProductModel = mongoose.model("product", ProductSchema)

export default ProductModel