import React, { useState } from 'react'
import "./shipping.css";
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import Deliverydetails from './Deliverydetails';
import ConfirmOrder from "./ConfirmOrder.jsx";
import Payment from './Payment.jsx';
import { ShippingInfosaved } from '../../Actions/cartItems.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ShippingInformation = ({ stripeApiKey }) => {
    const dispatch = useDispatch();
    const { shippinginfo, cartItems } = useSelector((state) => state.Cart);
    const { user } = useSelector((state) => state.User);
    const [shipping, setShipping] = useState({
        address: shippinginfo.address,
        city: shippinginfo.city,
        pincode: shippinginfo.pincode,
        mobileno: shippinginfo.mobileno,
        Country: shippinginfo.Country,
        state: shippinginfo.state
    });
    const [deliverydet, setDeliverydet] = useState(true);
    const [confirmorder, setconfirmorder] = useState(false);
    const [paymentopt, setpaymentopt] = useState(false);
    const DataChange = (e) => {
        e.preventDefault();
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    }
    const ShippingInfoSave = (e) => {
        e.preventDefault();
        if (shipping.mobileno.length < 10 || shipping.mobileno.length > 10) {
            alert("Mobile Number should be 10 digits");
            return;
        }
        setDeliverydet(false);
        setconfirmorder(true);
        dispatch(ShippingInfosaved(shipping));
    }
    const itemsPrice = Math.round(cartItems.reduce((acc, item) => acc + item.data.item.price * item.quantity, 0));
    const getdiscount = () => {
        let discount = 0;
        cartItems.map((item)=>{
          if(item.data.item.discount){
            discount += item.data.item.price*`0.${item.data.item.discount}`*item.quantity;
          }
        });
        return discount;
      }
    const discountPrice = Math.round(getdiscount());
    const shippingPrice = Math.round((itemsPrice - discountPrice < 5000) ? 0 : (itemsPrice - discountPrice) * 0.002);
    const taxPrice = Math.round((itemsPrice - discountPrice) * 0.18);
    const totalPrice = itemsPrice - discountPrice + shippingPrice + taxPrice;
    const confirm = () => {
        const paymentdata = {
            itemsPrice,
            discountPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem("orderPaymentInfo", JSON.stringify(paymentdata));
        setconfirmorder(false);
        setpaymentopt(true);
    }
    return (
        <div className='shipping'>
            <MetaData title="Place Your Order" />
            <div className="shipcontainer">
                <div className="shipdetails">
                    <Deliverydetails setDeliverydet={setDeliverydet} deliverydet={deliverydet} ShippingInfoSave={ShippingInfoSave} shippingInfo={shipping} DataChange={DataChange} />
                    <ConfirmOrder confirmorder={confirmorder} setconfirmorder={setconfirmorder} shippingInfo={shipping} user={user} cartItems={cartItems} confirm={confirm} />
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment user={user} paymentopt={paymentopt} setpaymentopt={setpaymentopt} dispatch={dispatch}/>
                    </Elements>
                </div>
                <div className="pricedetail">
                    <h2>PRICE DETAILS</h2>
                    <div className="sub1">
                        <div className="sinprice">
                            <h3>Price ({cartItems.length} Items)</h3>
                            <span>{itemsPrice} /-</span>
                        </div>
                        <div className="sinprice">
                            <h3>Discount</h3>
                            <span>{discountPrice === 0 ? (discountPrice) :(`-${discountPrice}`)} /-</span>
                        </div>
                        <div className="sinprice">
                            <h3>GST (18%) </h3>
                            <span>{taxPrice} /-</span>
                        </div>
                        <div className="sinprice">
                            <h3>Delivery Charges </h3>
                            <span>{shippingPrice} /-</span>
                        </div>
                    </div>
                    <div className="total">
                        <h3>Total</h3>
                        <span> {totalPrice} /-</span>
                    </div>
                    <div className="totalsavings">
                        <p>Your Total Savings on this Order {discountPrice} /-</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingInformation;