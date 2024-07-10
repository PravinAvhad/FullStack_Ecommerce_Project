import React from 'react'
import { useSelector } from 'react-redux';
import "./cart.css"
import CartItem from "../CartItemPage/CartItem.jsx";
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.Cart);
  const itemsPrice = Math.round(cartItems.reduce((acc, item) => acc + item.data.item.price * item.quantity, 0));
  const discountPrice = Math.round(itemsPrice * 0.2);
  const shippingPrice = Math.round((itemsPrice - discountPrice < 5000) ? 0 : (itemsPrice - discountPrice) * 0.002);
  const taxPrice = Math.round((itemsPrice - discountPrice < 5000) ? 0 : (itemsPrice - discountPrice) * 0.18);
  const totalPrice = Math.round(itemsPrice - discountPrice + shippingPrice + taxPrice);
  const placeOrder = () => {
    navigate(`/login?redirect=/checkout`);
  }

  return (
    <div className="cart">
      <MetaData title="Ecommerce Shopping Cart" />
      {cartItems.length === 0 ? (
        <div className="noitem">
          <h1>Your Cart is Empty</h1>
          <p>Let's add some Products</p>
          <button onClick={() => navigate("/products")}>Add Products</button>
        </div>
      ) : (
        <div className="cartsection">
          <div className="itemsSection">
            {cartItems && cartItems.map((item) => (
              <CartItem item={item} key={item.data.item._id} />
            ))}
          </div>
          <div className="pricedetailsSection">
            <h2>PRICE DETAILS</h2>
            <div className="pricedetails">
              <div className="sinprice">
                <h3>Price ({cartItems.length} Items)</h3>
                <span>{itemsPrice} /-</span>
              </div>
              <div className="sinprice">
                <h3>Discount</h3>
                <span>- {discountPrice} /-</span>
              </div>
              <div className="sinprice">
                <h3>Delivery Charges</h3>
                <p>{shippingPrice} /-</p>
              </div>
              <div className="sinprice">
                <h3>GST (18%) </h3>
                <span>{taxPrice} /-</span>
              </div>
            </div>
            <div className="total">
              <h3>Total</h3>
              <span> {totalPrice} /-</span>
            </div>
            <div className="placeorder">
              <button onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default Cart;