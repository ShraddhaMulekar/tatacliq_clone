import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";

const orderRouter = express.Router();

// ➕ Place Order
orderRouter.post("/buy", auth, async (req, res) => {
  const { productId, quantity, totalPrice, status } = req.body;
  const userId = req.user.id;

  try {
    const qty = Number(quantity);
    const price = Number(totalPrice);

    if (!productId || qty <= 0 || price <= 0) {
      return res
        .status(400)
        .json({ msg: "Invalid product or purchase details." });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found!" });
    }

    const newOrder = new OrderModel({
      userId,
      productId,
      quantity: qty,
      totalPrice: price,
      status: status || "pending",
    });

    await newOrder.save();
    console.info("✅ Order placed:", newOrder);
    return res.status(201).json({ msg: "Order placed successfully!", newOrder });
  } catch (error) {
    console.error("❌ Error in placing order:", error);
    return res.status(500).json({ msg: "Error placing order", error });
  }
});

// 📦 View Orders
orderRouter.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await OrderModel.find({ userId }).populate("productId");
    return res.status(200).json({ msg: "Orders fetched successfully!", orders });
  } catch (error) {
    console.error("❌ Error in fetching orders:", error);
    return res.status(500).json({ msg: "Error fetching orders", error });
  }
});

export default orderRouter;
