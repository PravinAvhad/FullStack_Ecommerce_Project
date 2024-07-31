import React from 'react'
import "./footer.css"
import { Link } from "react-router-dom"

const Footer = ({ isAuthenticated, user }) => {
  return (
    <div className='footer'>
      <div className="footersub1">
        <div className="sub1part1">
          <h1 className='footerheading'>Ecommerce</h1>
        </div>
        <div className="sub1part2">
          <div className="quicklinks">QUICK LINKS</div>
          <Link to="/" className='footerlinks'>Home</Link>
          {isAuthenticated && user.user.role === "admin" && (
            <Link to="/admin/dashboard" className="footerlinks">Dashboard</Link>
          )}
          <Link to="/products" className="footerlinks">Products</Link>
          <Link to="/about" className="footerlinks">About</Link>
        </div>
        <div className="sub1part3">
          <div className="quicklinks">DOWNLOAD OUR APP</div>
          <div className="">Download App for Android and IOS mobile Phones</div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlECLOIqxHbxV_AW3N-WCzIMBAcPosvMadvw&s" alt="Google PlayStore" className='appstoreimg' />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className='appstoreimg' />
        </div>
      </div>
      <div className="footersub2">
        <p>&copy; 2024 Ecommerce. All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer