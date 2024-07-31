import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../Layout/MetaData';
import { clear, getmyallorders } from '../../Actions/OrderAction';
import Loader from '../Layout/Loader/Loader';
import "./myorders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { myorders, loading, error } = useSelector((state) => state.Order);

  useEffect(() => {
    if (error) {
      toast.error(error,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      // console.log(error);
      dispatch(clear());
    }
    dispatch(getmyallorders());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (<Loader />) : (
        <div className='myorders'>
          <MetaData title="Ecommerce My Orders" />
          <div className="ordertable">
            {
              myorders.orders && myorders.orders.length > 0 ? (
                <table>
                  <thead>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Paid At</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {myorders.orders.map((ord) => (
                      <tr key={ord._id}>
                        <td>{ord._id}</td>
                        <td style={{color: ord.orderStatus==="Processing" ? "#FF4B2B" : ord.orderStatus === "Shipped" ? "black" : "green"}} >{ord.orderStatus}</td>
                        <td>{ord.Itemsorder.length}</td>
                        <td>{ord.paidAt.substr(0, 10)}</td>
                        <td>{ord.totalPrice}</td>
                        <td><button onClick={() => navigate(`/order/${ord._id}`)}>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>) : (
                <div className="noorder">
                  <h3>No Products Ordered</h3>
                  <div className="placeorder">
                    <button onClick={()=>navigate("/products")}>Place Order</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  )
}

export default MyOrders;