export const handleOrderNow = async ({ productId, quantity, totalPrice, navigate }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to place an order.");
    navigate("/login"); 
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/order/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        totalPrice,
        status: "pending",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.msg || "Order placed successfully!");
      navigate("/order");
    } else {
      alert(data.msg || "Failed to place order.");
    }
  } catch (error) {
    console.error("Order error:", error);
    alert("Something went wrong.");
  }
};
