import React from "react";
import Slider from "react-slick";
import "./Home.css";

const Home = () => {
  let settings = {
    // dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>
      <div
        className="home_carousel"
        style={{
          width: "99%",
          padding: "10px 50px",
          background: "rgb(240, 226, 223)",
        }}
      >
        <Slider
          style={{
            width: "98%",
            border: "solid darkPink",
            backgroundColor: "rgb(240, 226, 223)",
          }}
          className="home_slider"
          {...settings}
        >
          <div style={{ width: "100%" }}>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236471808030.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236471873566.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236471676958.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236471939102.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236472070174.png"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "90%" }}
              src="https://assets.tatacliq.com/medias/sys_master/images/65236471611422.png"
              alt=""
            />
          </div>
        </Slider>
      </div>

      <div className="home_cards">
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458516510.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458582046.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458647582.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458713118.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458778654.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458844190.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458909726.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244458975262.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244459040798.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244459106334.png"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65244459597854.png"
          alt=""
        />
      </div>

      <div className="home_bankCards">
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65280830832670.jpg"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65199475785758.jpg"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65199475851294.jpg"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/65017042042910.jpg"
          alt=""
        />
        <img
          src="https://assets.tatacliq.com/medias/sys_master/images/64684495831070.jpg"
          alt=""
        />
      </div>

      <div className="lighting_deal">
          <h1>Lightening Deals</h1>
          <div className="lighting_deal_card">
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469383198.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469448734.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469448734.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469579806.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469645342.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469710878.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469776414.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469841950.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469907486.jpg" alt="" />
            <img src="https://assets.tatacliq.com/medias/sys_master/images/65236469973022.jpg" alt="" />
          </div>
      </div>
    </div>
  );
};

export default Home;
