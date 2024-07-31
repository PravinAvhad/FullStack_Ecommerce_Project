import React from 'react'
import "./about.css"
import MetaData from '../Layout/MetaData'

const AboutUs = () => {
    return (
        <div className="about">
            <MetaData title="Ecommerce About Us" />
            <div className="sub1">
                <h1>About Us</h1>
                <p>Welcome to Ecommerce Platform, your go-to destination for seamless online shopping. Our platform is designed to provide sellers a dynamic, user-friendly environment, ensuring a satisfying and efficient shopping experience.</p></div>
            <div className="sub2">
                <h2>What We Offer</h2>
                <p>At Ecommerce Platform, we offer a vast array of products across various categories, including:</p>
                <ul>
                    <li>Electronics: From the latest gadgets to essential tech accessories.</li>
                    <li>Fashion: Trendy apparel, footwear, and accessories for all ages.</li>
                    <li>Health & Beauty: Top-quality products for your wellness and beauty needs.</li>
                    <li>Sports & Outdoors: Gear and equipment for every adventure.</li>
                    <li>Home & Garden: Everything you need to make your house a home.</li>
                </ul>
            </div>
            <div className="sub2">
                <h2>Why Choose Us </h2>
                <ul>
                    <li>User-Friendly Interface: Our platform is designed to provide a seamless shopping experience with easy navigation and efficient search functionalities.</li>
                    <li>Diverse Product Range: We offer a wide selection of products from trusted sellers to meet all your needs.</li>
                    <li>Secure Transactions: We prioritize your security with robust encryption and secure payment gateways.</li>
                </ul>
            </div>
        </div>
    )
}

export default AboutUs