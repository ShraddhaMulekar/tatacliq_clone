import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../public/Base_URL";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in.");
        return navigate("/login");
      }

      try {
        const res = await fetch(`${BaseURL}user/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        alert(data.msg || "Logout successful!");

        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed", error);
        alert("Logout failed. Try again.");
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging you out...</h2>
    </div>
  );
};

export default Logout;
