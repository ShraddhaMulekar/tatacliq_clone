import React, { useEffect, useState } from "react";
import "./Products.css";
import BaseURL from "../public/Base_URL";
import { useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const selectedCategory = queryParams.get("category");
  const selectedBrand = queryParams.get("brand");
  const searchQuery = queryParams.get("search");

  let fetchProducts = async () => {
    try {
      let res = await fetch(`${BaseURL}product/all-products`);
      let data = await res.json();
      let allProducts = data.fetchProduct;

      // Filter based on selected category
      let filtered = allProducts;

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) =>
            product.department?.toLowerCase() === selectedCategory.toLowerCase() ||
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      // Filter based on selected brand
      if (selectedBrand) {
        filtered = filtered.filter(
          (product) => product.brand?.toLowerCase() === selectedBrand.toLowerCase()
        );
      }

      // Filter based on search query
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedBrand, searchQuery]); // Trigger on change of category, brand or search

  return (
    <div className="product_main">
      <div className="product_cards">
        {products?.map((product, index) => (
          <div key={index} className="product_single_card">
            <img src={product.image} alt={product.brand} />
            <h3>{product.brand}</h3>
            <p>{product.content}</p>
            <p>₹{product.price}.00</p>
            <div className="product_rating">
              <p>Rating: {product.starRating}</p>
            </div>
            <button onClick={() => navigate(`/product/${product._id}`)}>View Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
