import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 
import BaseURL from "../public/Base_URL";
import "./Cart.css";
import { handleOrderNow } from "./OrderNow";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // 

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${BaseURL}cart/checkAddToCart`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.cart) {
        setCart(data.cart.item);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  // ✅ remove product from cart
  const handleRemove = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const res = await fetch(`${BaseURL}cart/removeCart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.msg || "Product removed from cart.");
        fetchCart();
      } else {
        alert(data.msg || "Failed to remove item.");
      }
    } catch (error) {
      console.error("Remove error:", error);
      alert("Error removing item from cart.");
    }
  };

  // ✅ place order for each item
  const handleClick = (item) => {
    handleOrderNow({
      productId: item.productId._id,
      quantity: item.quantity,
      totalPrice: item.productId.price * item.quantity,
      navigate,
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} className="cart-item">
            <img src={item.productId.image} alt={item.productId.brand} />
            <div className="cart-details">
              <h4>{item.productId.brand}</h4>
              <h5>{item.productId.content}</h5>
              <p>₹{item.productId.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
            <div>
              <button onClick={() => handleRemove(item.productId._id)}>
                Remove
              </button>
              <button onClick={() => handleClick(item)}>
                Order Now!
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
