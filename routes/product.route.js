import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";

const productRouter = express.Router();

productRouter.post("/add-products", auth, async (req, res) => {
  const { brand, content, image, price, starRating, numberRating, category, subCategory } =
    req.body;

  try {
    let newProduct = await ProductModel({
      brand,
      content,
      image,
      price,
      starRating,
      numberRating,
      category,
      subCategory
    });
    await newProduct.save();
    console.log("Product added successful!", newProduct);
    return res.json({ msg: "Product added successful!", newProduct });
  } catch (error) {
    console.log("error in adding product!", error)
    return res.json({ msg: "error in adding product!", error });
  }
});

// check all products
productRouter.get("/all-products", async (req, res) => {
  try {
    let newProduct = await ProductModel.find();
    console.log("all products", newProduct);
    res.json({ msg: "all products", newProduct });
  } catch (error) {
    return res.json({ msg: "error in getting product!", error });
  }
});

export default productRouter;
