import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";
import AddToCartModel from "../models/addToCart.model.js";

const addToCartRouter = express.Router();

// ➕ Add to Cart
addToCartRouter.post("/addToCart", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }

    const cart = await AddToCartModel.findOne({ userId });
    if (!cart) {
      const newCart = new AddToCartModel({
        userId,
        item: [{ productId, quantity }],
      });
      await newCart.save();
      return res.json({ msg: "Cart created and product added!", cart: newCart });
    }

    // Check if product already exists in cart
    const existingProduct = cart.item.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      await cart.save();
      return res.json({ msg: "Product quantity updated!", cart });
    } else {
      cart.item.push({ productId, quantity });
      await cart.save();
      return res.json({ msg: "Product added to cart!", cart });
    }

  } catch (error) {
    console.log("Error in add to cart", error);
    return res.status(500).json({ msg: "Error in add to cart", error });
  }
});

// ❌ Remove product from cart
addToCartRouter.delete("/removeCart", auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await AddToCartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found!" });
    }

    cart.item = cart.item.filter(
      (ele) => ele.productId.toString() !== productId.toString()
    );

    await cart.save();
    return res.json({ msg: "Product removed from cart!", cart });
  } catch (error) {
    console.log("Error in removing product from cart", error);
    return res.status(500).json({ msg: "Error in removing product from cart", error });
  }
});

// 👀 View Cart
addToCartRouter.get("/checkAddToCart", auth, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ msg: "User not authenticated!" });
    }

    const cart = await AddToCartModel.findOne({ userId: req.user.id }).populate("item.productId");
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found!" });
    }

    return res.json({ msg: "Cart fetched successfully!", cart });

  } catch (error) {
    console.log("Error in displaying cart", error);
    return res.status(500).json({ msg: "Error in displaying cart", error });
  }
});

export default addToCartRouter;
