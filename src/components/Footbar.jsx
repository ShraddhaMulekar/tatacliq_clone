import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaRegHandshake,
  FaSquareXTwitter,
  FaTags,
  FaYoutube,
} from "react-icons/fa6";
import "./Footbar.css";
import { GiTakeMyMoney } from "react-icons/gi";
import { LiaGgCircle } from "react-icons/lia";
import { TbBrandAppleFilled } from "react-icons/tb";
import { AiFillAndroid } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";

const Footbar = () => {
  return (
    <div>
      <div className="tataTrust">
        <p className="tataTrust_para">
          <strong>TATA</strong> <FaRegHandshake /> <span>TRUST</span>
        </p>
      </div>

      <div className="footer_list">
        <div className="footer_list_ul">
          <ul>
            <h5>Tata MarketPlace</h5>
            <li>About Us</li>
            <li>Careers</li>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Affiliates</li>
            <li>Sitemap</li>
          </ul>
        </div>

        <div className="footer_list_ul">
          <ul>
            <h5>Customer Service</h5>
            <li>Shopping</li>
            <li>Offers & Promotions</li>
            <li>Payments</li>
            <li>Cancellation</li>
            <li>Returns & Refunds</li>
            <li>CliQ And PiQ</li>
            <li>Contact Us</li>
            <li>Returns Policy</li>
            <li>Electronics Return Policy</li>
            <li>Reviews Guidelines</li>
          </ul>
        </div>

        <div className="footer_list_ul">
          <ul>
            <h5>My Tata CLiQ</h5>
            <li>My Account</li>
            <li>My Orders</li>
            <li>My Shopping Bag</li>
            <li>My Wishlist</li>
          </ul>
        </div>

        <div className="footer_list_ul">
          <h5>Tata CLiQ Offerings</h5>
          <p>
            Watches for Men|Campus Shoes|Sandals for Men|Sneakers for Men|Reebok
            Shoes|Cotton Kurtis|Woodland Shoes|Jumpsuits|Allen Solly|Sparx
            Shoes|Gold Rings|Formal Shoes for Men|Sports Shoes for Men|Wallets
            for Men|Ladies Watches|Trolley Bags|Handbags for Women|Sling Bags
            for Women|Casual Shoes for Men|Boots for Men|Digital Watches|Sonata
            Watches|Sneakers for Women|Running Shoes|Puma Shoes|Boots for
            Women|Skechers|Malabargold|Fabindia|Utsa|Vark|Gia|LOV|Sitemap
          </p>
        </div>
      </div>

      <div className="footer_middle">
        <div className="footer_download">
          <p>Download App
          <AiFillAndroid style={{width:"15px"}} />
          <TbBrandAppleFilled style={{width:"15px"}} />
          </p>
        </div>
        <div className="footer_social">
          <FaFacebook style={{width:"15px"}} />
          <FaSquareXTwitter style={{width:"15px"}} />
          <FaInstagramSquare style={{width:"15px"}} />
          <FaYoutube style={{width:"15px"}} />
          <FaLinkedin style={{width:"15px"}} />
        </div>
        <div className="copyright">
          <MdCopyright style={{width:"15px"}} /> 2025 Tata CLiQ | All rights reserved
        </div>
      </div>

      <div className="footer_qa">
       
          <div className="questions_ans">
            <h4>Tata CLiQ FASHION: Shop Online with India's most trusted destination</h4>
            <p>Genuine products from all the top brands get delivered right to your doorstep. Our sleek, immersive design allows you to easily navigate between categories and brand stores so that you can find a wide selection of womenswear, menswear, kidswear, footwear, watches, accessories, footwear, watches and accessories online. You can also check our great offers and get the best prices on various products across lifestyle, fashion, and more.</p>
          </div>
          <div>
            <h4>Online Shopping: Fast & convenient with the click of a button</h4>
            <p>The upside of online shopping at Tata CLiQ FASHION online store, is that you'll save on time and most importantly money with Tata Cliq FASHION offers. It's as simple as comparing products and prices online before making the right buy. What's more, you also have the option to pay for your favourite brands and products using our easy EMI options. Of course, you can buy and try - in the convenience of your home. Returns are easy too: We'll pick up your returns for free or you can also drop off the goods at the nearest brand store.</p>
          </div>
          <div>
            <h4>Tata CLiQ FASHION Shopping App: just a few clicks on Android & iOS</h4>
            <p>Download the Android app from the Play Store or the iOS app from Apple App Store and get set to enjoy a range of benefits. Apart from the best deals, amazing offers and the latest styles online, the app also gives you the flexibility to shop at your convenience. Use the easy share options to share your shopping with your friends and family to ensure you're buying something perfect. With constant updates and a host of new features being introduced constantly, enjoy a shopping experience that you'll love.</p>
          </div>
          <div>
            <h4>Tata CLiQ FASHION: The most genuine place for Fashion and Lifestyle</h4>
            <p>With an exclusive Brand Store for Westside Online we have most of your trendy shopping needs taken care of. Make Tata CLiQ FASHION your online shopping destination and get the best deals on your favourite brands, with 100% genuine products. Be it jewellery or makeup, you can count on Tata CLiQ FASHION for receiving only the most authentic products.</p>
          </div>
       
      </div>
    </div>
  );
};

export default Footbar;
