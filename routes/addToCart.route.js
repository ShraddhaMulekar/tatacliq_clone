import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";
import AddToCartModel from "../models/addToCart.model.js";

const addToCartRouter = express.Router();

// add to cart functionality
addToCartRouter.post("/addToCart", auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.json({ msg: "Product not found!" });
    }
    const cart = await AddToCartModel.findOne({ userId });
    if (!cart) {
      let newCart = new AddToCartModel({
        userId,
        item: [{ productId, quantity }],
      });
      await newCart.save();
      return res.json({ msg: "Cart created and product added!", newCart });
    } else {
      let existingProduct = cart.item.find(
        (item) => item.productId.toString() === productId.toString()
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
        await cart.save()
        return res.json({msg:"product quantity updated!", cart})
      } else {
        cart.item.push({ productId, quantity });
        await cart.save()
        return res.json({msg:"product added to cart!", cart})
      }
    }
    await cart.save();
    console.log("cart add successful!", cart);
    return res.json({ msg: "cart add successful!", cart });
  } catch (error) {
    console.log("error in add to cart", error);
    return res.json({ msg: "error in add to cart", error });
  }
});

// product remove from cart
addToCartRouter.delete("/remove_cart", auth, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await AddToCartModel.findOne({ userId });
    if (!cart) {
      return res.json({ msg: "cart not found!" });
    }
    cart.item = cart.item.filter(
      (ele) => ele.productId.toString() !== productId.toString()
    );

    await cart.save();
    console.log("Product remove from cart!", cart);
    return res.json({ msg: "Product remove from cart!", cart });
  } catch (error) {
    console.log("error in remove product cart", error);
    return res.json({ msg: "error in remove product cart", error });
  }
});

//display cart
addToCartRouter.get("/checkAddToCart", auth, async(req, res) => {
    try {
        if (!req.user.id){
            return res.json({msg:"product not found!"})
        } 
        let cart = await AddToCartModel.findOne({ userId: req.user.id }).populate("item.productId")
        if (!cart){
            return res.json({msg: "cart not found!"})
        }
        return res.json({msg:"cart found successful!", cart})

    } catch (error) {
        console.log("error in display cart!", error)
        res.json({ msg: "error in display cart!", error});
    }
});

export default addToCartRouter;
