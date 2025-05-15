import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";

const productRouter = express.Router();

// add product
productRouter.post("/add-products", auth, async (req, res) => {
  const {
    brand,
    content,
    image,
    price,
    starRating,
    numberRating,
    category,
    subCategory,
  } = req.body;

  try {
    let newProduct = await ProductModel({
      brand,
      content,
      image,
      price,
      starRating,
      numberRating,
      category,
      subCategory,
    });
    await newProduct.save();
    console.log("Product added successful!", newProduct);
    return res.json({ msg: "Product added successful!", newProduct });
  } catch (error) {
    console.log("error in adding product!", error);
    return res.json({ msg: "error in adding product!", error });
  }
});

//update product
productRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.json({ msg: "product not available!" });
    }
    const updateProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log("Product updated successful!", updateProduct);
    return res.json({ msg: "Product updated successful!", updateProduct });
  } catch (error) {
    console.log("error in update product!", error);
    return res.json({ msg: "error in update product!", error });
  }
});

//delete product
productRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findOneAndDelete(id);
    console.log("Product Delete successful!", deleteProduct);
    return res.json({ msg: "Product Delete successful!", deleteProduct });
  } catch (error) {
    console.log("error in delete product!", error);
    return res.json({ msg: "error in delete product!", error });
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
