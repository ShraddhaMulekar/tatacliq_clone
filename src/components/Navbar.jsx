import React, { useState, useEffect } from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useNavigate, Link } from "react-router-dom";
import BaseURL from "../public/Base_URL.js";
import "./Navbar.css";

const Navbar = () => {
  const [departments, setDepartments] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch departments and brands from API
  const fetchDepartmentsAndBrands = async () => {
    try {
      let res = await fetch(`${BaseURL}product/all-products`);
      let data = await res.json();

      let allDepartments = data.fetchProduct.map((product) => product.department);
      let uniqueDepartments = [...new Set(allDepartments)];

      let allBrands = data.fetchProduct.map((product) => product.brand);
      let uniqueBrands = [...new Set(allBrands)];

      setDepartments(uniqueDepartments);
      setBrands(uniqueBrands);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchDepartmentsAndBrands();
  }, []);

  // Handle user login, register, or logout
  const handleAuthChange = (e) => {
    const value = e.target.value;
    if (value === "register") navigate("/register");
    else if (value === "login") navigate("/login");
    else if (value === "logout") {
      localStorage.removeItem("token");
      alert("Logged out successfully");
      navigate("/");
    }
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    const selectedBrand = new URLSearchParams(window.location.search).get("brand");
    const updatedSearch = searchQuery ? `search=${searchQuery}` : '';
    
    let queryString = `?category=${selectedCategory}`;
    if (selectedBrand) queryString += `&brand=${selectedBrand}`;
    if (updatedSearch) queryString += `&${updatedSearch}`;

    navigate(`/products${queryString}`);
  };

  // Handle brand selection
  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    const selectedCategory = new URLSearchParams(window.location.search).get("category");
    const updatedSearch = searchQuery ? `search=${searchQuery}` : '';
    
    let queryString = `?brand=${selectedBrand}`;
    if (selectedCategory) queryString += `&category=${selectedCategory}`;
    if (updatedSearch) queryString += `&${updatedSearch}`;

    navigate(`/products${queryString}`);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const selectedCategory = new URLSearchParams(window.location.search).get("category");
    const selectedBrand = new URLSearchParams(window.location.search).get("brand");

    let queryString = `?search=${e.target.value}`;
    if (selectedCategory) queryString += `&category=${selectedCategory}`;
    if (selectedBrand) queryString += `&brand=${selectedBrand}`;

    navigate(`/products${queryString}`);
  };

  return (
    <div className="main_navbar">
      {/* Logo */}
      <div className="navbar_logo">
        <Link to="/">
        <img
          src="https://m.media-amazon.com/images/I/31YFWQtEOfL.jpg"
          alt="logo"
          className="logo"
        />
        </Link>
      </div>

      {/* Category & Brand */}
      <div className="navbar_department_brand">
        <div className="navbar_department">
          <select className="navbar_department_selector" onChange={handleCategoryChange}>
            <option value="">Categories</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
        <div className="navbar_brand">
          <select className="navbar_brand_selector" onChange={handleBrandChange}>
            <option value="">Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Cart & Registration */}
      <div className="navbar_sign_cart">
        <div className="navbar_cart" onClick={() => navigate("/cart")}>
          <span>
            <LiaShoppingBagSolid className="cart" />
          </span>
        </div>

        <div className="register">
          <select onChange={handleAuthChange}>
            <option value="">Account</option>
            <option value="register">Register</option>
            <option value="login">Log in</option>
            <option value="logout">Log out</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
