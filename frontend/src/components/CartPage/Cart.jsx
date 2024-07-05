import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./cart.css"
import CartItem from "../CartItemPage/CartItem.jsx";
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.Cart);
  // let discountsum = sum * 0.2;
  // let totalsum = sum * 0.8;
  useEffect(() => {
    // console.log(cartItems);
  }, []);

  return (
    <div className="cart">
      {cartItems.length === 0 ? (
        <div className="noitem">
          <h1>Your Cart is Empty</h1>
          <p>Let's add some Products</p>
          <button onClick={()=>navigate("/products")}>Add Products</button>
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
                <span>{`${cartItems.reduce((acc,item)=> acc + item.data.item.price* item.quantity,0)}`} /-</span>
              </div>
              <div className="sinprice">
                <h3>Discount</h3>
                <span>- {`${cartItems.reduce((acc,item)=> acc + item.data.item.price* item.quantity,0)}`*0.2} /-</span>
              </div>
              <div className="sinprice">
                <h3>Delivery Charges</h3>
                <p>Free</p>
              </div>
            </div>
            <div className="total">
              <h3>Total</h3>
              <span> {`${cartItems.reduce((acc,item)=> acc + item.data.item.price* item.quantity,0)}`*0.8} /-</span>
            </div>
            <div className="placeorder">
              <button>Place Order</button>
            </div>
          </div>
        </div>)}
    </div>
  )
}

export default Cart;