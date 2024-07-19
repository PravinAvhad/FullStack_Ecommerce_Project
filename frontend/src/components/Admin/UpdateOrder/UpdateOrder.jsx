import React, { useEffect, useState } from 'react'
import "./update.css"
import Aside from '../AsideBar/Aside'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, updateOrder } from '../../../Actions/OrderAction';
import Loader from '../../Layout/Loader/Loader';
import { adminUpdateOrderReset } from '../../../Store/Slices/AdminUpDelOrder';
import MetaData from '../../Layout/MetaData';

const UpdateOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { OrderDetails, loading, error } = useSelector((state) => state.OrderDetails);
    const { isUpdatedOrder, error: UpdateOrderError } = useSelector((state) => state.AdminUpDelOrder);
    const [order, setorder] = useState({
        status: ""
    });
    const updatestatus = (e) => {
        e.preventDefault();
        dispatch(updateOrder(id, order));
        console.log(order);
    }
    useEffect(() => {
        if (error) {
            console.log(error);
        }
        if (UpdateOrderError) {
            console.log(UpdateOrderError);
        }
        if (isUpdatedOrder) {
            console.log("Order Updated");
            navigate("/admin/orders");
            dispatch(adminUpdateOrderReset());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error, isUpdatedOrder, navigate, id, UpdateOrderError]);
    return (
        <>
            {loading ? (<Loader />) : (
                <div className="adminProcessOrder">
                    <MetaData title="Ecommerce : Admin Process Order"/>
                    <Aside />
                    <div className="processOrder">
                        <h2>Process Order</h2>
                        <div className="processOrdersection">
                            <div className="leftsection"style={{width : OrderDetails.order && OrderDetails.order.orderStatus === "Delivered" && "100%"}}>
                                <div className='sub1'>
                                    <h3>Order Details</h3>
                                    <p>Name : {OrderDetails.order && OrderDetails.order.user.name}</p>
                                    <p>Mobile/Phone No. : {OrderDetails.order && OrderDetails.order.shippinginfo.mobileno}</p>
                                    <p>Address : {OrderDetails.order && `${OrderDetails.order.shippinginfo.address}, ${OrderDetails.order.shippinginfo.city}, ${OrderDetails.order.shippinginfo.state}, ${OrderDetails.order.shippinginfo.Country}, ${OrderDetails.order.shippinginfo.pincode}`}</p>
                                    <div className="dateid">
                                        <p>Ordered On : {OrderDetails.order && OrderDetails.order.paidAt.substr(0, 10)}</p>
                                        <p>Order Id : {id}</p>
                                    </div>
                                    <p>Order Status : <span style={{ color: OrderDetails.order && OrderDetails.order.orderStatus === "Processing" ? "#FF4B2B" : OrderDetails.order && OrderDetails.order.orderStatus === "Shipped" ? "black" : "green" }}>{OrderDetails.order && OrderDetails.order.orderStatus}</span></p>
                                </div>
                                <div className="sub2">
                                    <h3>Payment</h3>
                                    <p>Status : <span style={OrderDetails.order && OrderDetails.order.paymentInfo.status === "succeeded" ? { color: "green" } : { color: "tomato" }} >{OrderDetails.order && OrderDetails.order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</span></p>
                                    <p>Total Amount : Rs. {OrderDetails.order && OrderDetails.order.totalPrice} /-</p>
                                </div>
                                <div className="sub3">
                                    <h3>Your Orders :</h3>
                                    <div className="allorderitems">
                                        {OrderDetails.order && OrderDetails.order.Itemsorder && OrderDetails.order.Itemsorder.map((item) => (
                                            <div className="orderitem">
                                                <img onClick={() => navigate(`/product/${item.product}`)} src={item.image} alt={item.image} />
                                                <h3 onClick={() => navigate(`/product/${item.product}`)} className='productname'>{item.name}</h3>
                                                <div className="prices">
                                                    <h3>{`Rs. ${item.price} x ${item.quantity} = Rs. ${item.price * item.quantity}`}</h3>
                                                    {item.discount > 0 && (
                                                        <h3 style={{ color: "green" }}>Discount : {item.discount}%</h3>)}
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="rightsection" style={{display : OrderDetails.order && OrderDetails.order.orderStatus === "Delivered" ? "none": "block"}}>
                                <h3>Process Order Form</h3>
                                <form onSubmit={updatestatus}>
                                    <label for="category">Order Status : </label>

                                    <select
                                        name="status"
                                        required
                                        value={order.status}
                                        onChange={(e) => setorder({ ...order, [e.target.name]: e.target.value })} >
                                        <option value="">Choose OrderStatus</option>
                                        {OrderDetails.order && OrderDetails.order.orderStatus === "Processing" && (<>
                                            <option value="Shipped">Shipped</option>
                                        </>)}
                                        {OrderDetails.order && OrderDetails.order.orderStatus === "Shipped" && (<>
                                            <option value="Delivered">Delivered</option>
                                        </>)}
                                    </select>

                                    <button type='submit'
                                        disabled={loading ? true : false || order.status === "" ? true : false}>Process</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdateOrder