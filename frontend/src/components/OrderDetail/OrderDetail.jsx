import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../Actions/OrderAction';
import "./orderdetail.css"
import Loader from "../Layout/Loader/Loader";
import Metadata from "../Layout/MetaData";

const OrderDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { OrderDetails, loading, error } = useSelector((state) => state.OrderDetails);
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error])
    
    return (
        <>
            {loading ? (<Loader />) : (
                <div className="orderdetail">
                    <Metadata title="Ecommerce Order Details" />
                    <div className="orderdetailcontainer" id="ordersection">
                        <div className="sub1">
                            <div>
                                <h2>Order Details</h2>
                                <p>Name : {OrderDetails.order && OrderDetails.order.user.name}</p>
                                <p>Mobile/Phone No. : {OrderDetails.order && OrderDetails.order.shippinginfo.mobileno}</p>
                                <p>Address : {OrderDetails.order && `${OrderDetails.order.shippinginfo.address}, ${OrderDetails.order.shippinginfo.city}, ${OrderDetails.order.shippinginfo.state}, ${OrderDetails.order.shippinginfo.Country}, ${OrderDetails.order.shippinginfo.pincode}`}</p>
                                <div className="dateid">
                                    <p>Ordered On : {OrderDetails.order && OrderDetails.order.paidAt.substr(0,10)}</p>
                                    <p>Order Id : {id}</p>
                                </div>
                            </div>
                            {/* <button onClick={orderprint}>Invoice</button> */}
                        </div>
                        <div className="sub2">
                            <div className="paymentmethods">
                                <h3 style={{textWrap:"wrap"}}>Payment Method : Card</h3>
                                <h3>Order Status : {OrderDetails.order && OrderDetails.order.orderStatus}</h3>
                            </div>
                            <div className="ordersummary">
                                <h3>Order Summary</h3>
                                <div className="orderallprices">
                                    <div className="price">
                                        <p>SubTotal : </p>
                                        <p>{OrderDetails.order && OrderDetails.order.itemsPrice}</p>
                                    </div>
                                    <div className="price">
                                        <p>Discount : </p>
                                        <p>{OrderDetails.order && OrderDetails.order.discountPrice ? (OrderDetails.order.discountPrice === 0 ? OrderDetails.order.discountPrice : `- ${OrderDetails.order.discountPrice}`) : 0}</p>
                                    </div>
                                    <div className="price">
                                        <p>Tax : </p>
                                        <p>{OrderDetails.order && OrderDetails.order.taxPrice}</p>
                                    </div>
                                    <div className="price">
                                        <p>Shipping : </p>
                                        <p>{OrderDetails.order && OrderDetails.order.shippingPrice ? OrderDetails.order.shippingPrice : "Free"}</p>
                                    </div>
                                    <div className="price">
                                        <p>Total { OrderDetails.order && OrderDetails.order.paymentInfo.status === "succeeded" ? `Paid ` : `Not Paid`} : </p>
                                        <p>{OrderDetails.order && OrderDetails.order.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Till Here Completed */}
                        <div className="sub3">
                            <h3>Your Orders :</h3>
                            <div className="allorderitems">
                                {OrderDetails.order && OrderDetails.order.Itemsorder && OrderDetails.order.Itemsorder.map((item) => (
                                    <div className="orderitem">
                                        <img src={item.image} alt="Order Image" />
                                        <h3>{item.name}</h3>
                                        <h3>{`Rs. ${item.price} x ${item.quantity} = Rs. ${item.price * item.quantity}`}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>)}
        </>
    )
}

export default OrderDetail;