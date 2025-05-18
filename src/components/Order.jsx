import React, { useEffect, useState } from "react";
import BaseURL from "../public/Base_URL";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in to view orders.");

    try {
      const res = await fetch(`${BaseURL}order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      } else {
        alert(data.msg || "Could not fetch orders.");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, i) => (
          <div className="order-card" key={i}>
            <img src={order.productId.image} alt={order.productId.brand} />
            <div>
              <h4>{order.productId.brand}</h4>
              <p>{order.productId.content}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ₹{order.totalPrice}</p>
              <p>Status: {order.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;