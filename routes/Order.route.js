import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";

const orderRouter = express.Router();

// add order
orderRouter.post("/buy", auth, async (req, res) => {
  const { productId, quantity, totalPrice, status } = req.body;
  const userId = req.user.id;
  try {
    const product = await ProductModel.findOne({ productId });
    if (!product) {
      return res.json({ msg: "product not found" });
    }
    const newOrder = new OrderModel({
      userId,
      productId,
      quantity,
      totalPrice,
      status,
    });
    await newOrder.save();
    console.log("order buy successful!", newOrder);
    return res.json({ msg: "order buy successful!", newOrder });
  } catch (error) {
    console.log("error in buy order!", error);
    return res.json({ msg: "error in buy order!", error });
  }
});

// display order
orderRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let orders = await OrderModel.find({ userId }).populate("productId");
    console.log("your order!..", orders);
    return res.json({ msg: "your order!..", orders });
  } catch (error) {
    console.log("error in order route", error);
    res.json({ msg: "error in order route", error });
  }
});

export default orderRouter;
