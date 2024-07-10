import React, { useEffect, useState} from 'react';
import "./shipping.css";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useStripe, CardNumberElement, CardExpiryElement, useElements, CardCvcElement } from "@stripe/react-stripe-js";
import { clear, createOrder } from '../../Actions/Order';

const Payment = ({ user, paymentopt, setpaymentopt, dispatch}) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderPaymentInfo"));
    const { shippinginfo, cartItems } = useSelector((state) => state.Cart);
    const { error } = useSelector((state) => state.Order);
    const orderdetails = {
        shippinginfo,
        Itemsorder: cartItems.map((maindata)=> {
            const temp = {
                name: maindata.data.item.name,
                price: maindata.data.item.price,
                quantity: maindata.quantity,
                image: maindata.data.item.images[0].Url,
                product:  maindata.data.item._id
            }
            return temp;
        }),
        itemsPrice: orderInfo && orderInfo.itemsPrice,
        taxPrice: orderInfo && orderInfo.taxPrice,
        shippingPrice: orderInfo && orderInfo.shippingPrice,
        totalPrice: orderInfo && orderInfo.totalPrice,
    }
    const paymentdata = {
        amount: orderInfo && Math.round(orderInfo.totalPrice * 100),
    }
    const payment = async (e) => {
        e.preventDefault();
        try {
            if (orderInfo) {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const { data } = await axios.post(`/api/v4/payment/process`, paymentdata, config);
                if (!stripe || !elements) return;
                const client_secret = data.client_secret;
                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.user.name,
                            email: user.user.email,
                            address: {
                                line1: shippinginfo.address,
                                city: shippinginfo.city,
                                state: shippinginfo.state,
                                postal_code: shippinginfo.pinCode,
                                country: shippinginfo.country,
                            }
                        }
                    }
                });
                // console.log(result);
                if (result.error) {
                    console.log(result.error);
                    alert(result.error);
                }
                else {
                    if (result.paymentIntent.status === "succeeded") {
                        orderdetails.paymentInfo = {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                        }
                        alert(`Success`);
                        // console.log("OrderDetails:", orderdetails);
                        dispatch(createOrder(orderdetails));
                        navigate("/success");
                    }
                    else {
                        alert(`There's some issue while Proceeding Payment`)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clear());
        }
    }, [error, dispatch])

    return (
        <div className="shipinfo">
            <div className="shipinfoheading">
                <div className="shipinfoheadingsub">
                    <h3>3</h3>
                    <h3>PAYMENT </h3>
                </div>
                {paymentopt ? (
                    <FontAwesomeIcon icon={faChevronUp} />) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                )}
            </div>
            {paymentopt && (
                <div className="shipinfocontainer" id='payment'>
                    <div className="sub1">
                        <h3>Card Info</h3>
                    </div>
                    <form onSubmit={payment}>
                        <CardNumberElement className='paymentinput' />
                        <CardExpiryElement className='paymentinput' />
                        <CardCvcElement className='paymentinput' />
                        <input type="submit" className='button' value={`Pay ${orderInfo && Math.round(orderInfo.totalPrice)}/-`} />
                    </form>
                </div>
            )}
        </div>
    )
}

export default Payment