import React from 'react'
import "./shipping.css";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartItem from '../CartItemPage/CartItem';

const ConfirmOrder = ({ confirmorder,setconfirmorder, shippingInfo, user, cartItems,confirm }) => {
    return (
        <div className="shipinfo">
            <div className="shipinfoheading">
                <div className="shipinfoheadingsub">
                    <h3>2</h3>
                    <h3>CONFIRM ORDER</h3>
                </div>
                {confirmorder ? (
                    <FontAwesomeIcon icon={faChevronUp} />) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                )}
            </div>
            {confirmorder && (
                <div className="shipinfocontainer" id='confirm'>
                    <div className="sub1">
                        <h3>Shipping Info : </h3>
                        <div className="info">
                            <h4>Name :</h4>
                            <p>{user.user.name}</p>
                        </div>
                        <div className="info">
                            <h4>Mobile Number :</h4>
                            <p>{shippingInfo.mobileno}</p>
                        </div>
                        <div className="info">
                            <h4>Address :</h4>
                            <p>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}, ${shippingInfo.country}`}.</p>
                        </div>
                    </div>
                    <div className="sub2">
                        <h3 className='cartitemsheading'>Your Cart Items : </h3>
                        <div className="allcartitems">
                            {cartItems && cartItems.map((item) => (
                                <CartItem item={item} key={item.data.item._id} />
                            ))}
                        </div>
                    </div>
                    <div className="sub3">
                        <button onClick={confirm}>Confirm</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ConfirmOrder;