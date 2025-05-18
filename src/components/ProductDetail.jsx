import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseURL from "../public/Base_URL";
import "./ProductDetail.css";
import { handleOrderNow } from "./OrderNow";

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchSingleProducts = async () => {
    let res = await fetch(`${BaseURL}product/all-products/${id}`);
    let data = await res.json();
    console.log(data.product);
    setProducts(data.product);
  };

  useEffect(() => {
    fetchSingleProducts();
  }, [id]);

  // add to cart
  let handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Log in First!");
      navigate("/login");
      return;
    }

    try {
      let res = await fetch(`${BaseURL}cart/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: products._id,
          quantity: 1,
        }),
      });
      let data = await res.json();
      console.log("add to cart detail", data);
      if (res.ok || data.cart) {
        alert("Product added to cart!");
        navigate("/cart");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.log("something went wrong!", error);
      alert("something went wrong!");
    }
  };

  //   console.log(products);
  return (
    <div className="main_single_product">
      {
        <div className="single_product_content">
          <div className="single_product_img">
            <img
              className="single_product_img_tag"
              src={products.image}
              alt=""
            />
          </div>
          <div className="single_product_detail">
            <h2>{products.brand}</h2>
            <h3>{products.content}</h3>
            <h3>Price: ₹ {products.price}.00</h3>
            <p>Department: {products.department}</p>
            <p>Category: {products.category}</p>
            <p>Product Type: {products.productType}</p>
            <p>⭐{products.starRating}</p>
            <p>🔢{products.numberRating}</p>
            <div className="single_product_buttons">
              <button onClick={handleAddToCart}>Add to Cart</button>
              <button
                onClick={() =>
                  handleOrderNow({
                    productId: products._id,
                    quantity: 1,
                    totalPrice: products.price,
                    navigate, 
                  })
                }
              >
                Order Now!
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProductDetail;
