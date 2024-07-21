import React, { useEffect } from 'react'
import Aside from '../AsideBar/Aside'
import "./orders.css";
import { useDispatch, useSelector } from 'react-redux';
import { admingetallOrders, Orderdelete } from '../../../Actions/OrderAction';
import Loader from "../../Layout/Loader/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { adminDelOrderReset } from '../../../Store/Slices/AdminUpDelOrder';
import MetaData from '../../Layout/MetaData';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, adminOrders } = useSelector((state) => state.AdminGetOrders);
  const {loading:DelLoading,isDeletedOrder,error:DelError} = useSelector((state)=> state.AdminUpDelOrder);

  useEffect(() => {
    if(error){
      alert("Get Orders Error :",error);
      console.log(error)
    }
    if(DelError){
      alert("Delete Order Error : ",error);
      console.log(error)
    }
    if(isDeletedOrder){
      alert("Product Deleted");
      navigate("/admin/orders");
      dispatch(adminDelOrderReset());
    }
    dispatch(admingetallOrders());
  }, [dispatch,error,DelError,isDeletedOrder,navigate]);

  const deleteorder = (id)=>{
    dispatch(Orderdelete(id));
  }
  return (
    <>
    {loading || DelLoading ? (<Loader />) : (
      <div className="adminallproducts">
        <MetaData title="Ecommerce : Admin All Orders"/>
        <Aside />
        <div className="products">
          <h2>All Orders</h2>
          <div className="sub">
            {
              adminOrders && adminOrders.orders && adminOrders.orders.length > 0 ? (
                <table>
                  <thead>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Item Quantity</th>
                    <th>Total Amount</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {
                      adminOrders && adminOrders.orders.map((item) => (
                        <tr key={item._id}>
                          <td style={{color:"#FF4B2B"}}>...{item._id.substr(17,23)}</td>
                          <td style={{color : item.orderStatus === "Processing" ? "#FF4B2B" : item.orderStatus === "Shipped" ? "black" : "green"}}>{item.orderStatus}</td>
                          <td>{item.Itemsorder.length}</td>
                          <td>{item.totalPrice}</td>
                          <td className='actions'>
                            <button onClick={()=>navigate(`/admin/order/${item._id}`)}><FontAwesomeIcon icon={faPen} /></button>
                            <button onClick={()=>deleteorder(item._id)}><FontAwesomeIcon icon={faTrash} /></button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                <div className="noOrders">
                <h3>No Orders Received</h3>
                </div>
              )}
          </div>
        </div>
      </div>)}
  </>
  )
}

export default Orders