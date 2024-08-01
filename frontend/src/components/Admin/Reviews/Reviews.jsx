import React, { useEffect, useState } from 'react'
import "../Orders/orders.css";
import "./adminreviews.css";
import Aside from '../AsideBar/Aside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletereview, getallReviews } from '../../../Actions/itemAction';
import Loader from "../../Layout/Loader/Loader";
import { clearError } from '../../../ReduxStore/Slices/AdminReviews';
import { adminDeleteReviewReset, clearReviewError } from '../../../ReduxStore/Slices/AdminDelReview';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MetaData from '../../Layout/MetaData';

const Reviews = () => {
  const dispatch = useDispatch();
  const [pname, setPname] = useState("");

  const { loading, adminReviews, error } = useSelector((state) => state.AdminReviews);
  const {loading:DelLoading,isDeleted,error:DelError} = useSelector((state)=> state.AdminDelReview);
 
  const getreviews = (e) => {
    e.preventDefault();
    dispatch(getallReviews(pname));
  }
  const deleteReview = (id) => {
    // console.log("Delete Review Id : ",adminReviews.itemId, id);
    dispatch(deletereview(adminReviews.itemId,id));
  }
  useEffect(() => {
    if(error){
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
      // console.log(`Get All Reviews Error : ${error}`);
      dispatch(clearError());
    }
    if(DelError){
      toast.error(DelError,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      // console.log(`Delete Review Error : ${DelError}`);
      dispatch(clearReviewError());
    }
    if(isDeleted){
      toast.success("Review Deleted",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      dispatch(getallReviews(pname));
      dispatch(adminDeleteReviewReset());
    }
  }, [dispatch,error,isDeleted,DelError,pname]);

  return (<>
    {loading || DelLoading ? (<Loader />) : (
      <div className="adminReviews">
        <MetaData title="Ecommerce : Admin All Reviews"/>
        <Aside />
        <div className="reviews">
          <h2>All Reviews</h2>
          <div className="sub1">
            <form onSubmit={getreviews}>
              <input type="text" placeholder='Product Name' required
                value={pname} onChange={(e) => setPname(e.target.value)} />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="sub2">
            {
              adminReviews.Reviews ? (adminReviews.Reviews.length > 0 ? (
                <table>
                  <thead>
                    <th>User</th>
                    <th>Review</th>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </thead>
                  <tbody>
                    {
                      adminReviews && adminReviews.Reviews.map((review) => (
                        <tr key={review._id}>
                          <td>{review.name}</td>
                          <td>{review.comment}</td>
                          <td>{review.rating}</td>
                          <td>{`${new Date(review.createdAt).getUTCDate()}/${new Date(review.createdAt).getUTCMonth()+1}/${new Date(review.createdAt).getUTCFullYear()}`}</td>
                          <td className='actions'>
                            <button onClick={() => deleteReview(review._id)}><FontAwesomeIcon icon={faTrash} /></button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                <div className="noReviews">
                  <h3>No Reviews Yet</h3>
                </div>
              )) : (
                <></>
              ) }
          </div>
        </div>
      </div>)}
  </>
  )
}

export default Reviews