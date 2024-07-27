import React, { useEffect, useState } from 'react'
import "./productdetails.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Layout/Loader/Loader';
import { fetchItemDetails, ItemReview } from '../../Actions/itemAction';
import { addItemsToCart } from '../../Actions/cartItems';
import MetaData from '../Layout/MetaData';
import { itemReviewReset } from '../../Store/Slices/ItemReview';
import StarRating from './StarRating';
import ReviewComponent from './ReviewComponent';
import { getmyallorders } from '../../Actions/OrderAction';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { itemDetails, loading, error } = useSelector(state => state.ItemDetails);
    const { loading: ItemReviewLoading, error: newItemReviewError, success } = useSelector((state) => state.ItemReview);
    const { loading: MyOrdersLoading, error: MyOrdersError, myorders } = useSelector((state) => state.Order);
    const { isAuthenticated,user } = useSelector((state) => state.User);
    const [quantity, setquantity] = useState(1);
    const [currimg, setcurrimg] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [itemId, setItemId] = useState(id);
    useEffect(() => {
        if (!itemDetails || itemDetails._id !== id) {
            dispatch(fetchItemDetails(id));
            if(isAuthenticated && user.user.role === "user"){
                dispatch(getmyallorders());
            }
        }
        if (error) {
            console.log(error);
            toast.error(error);
        }
        if (newItemReviewError) {
            console.log(newItemReviewError);
            alert(newItemReviewError);
        }
        if (MyOrdersError) {
            console.log(MyOrdersError);
            alert(MyOrdersError);
        }
        if (itemDetails.images) {
            setcurrimg(itemDetails.images && itemDetails.images?.map(obj => obj.Url)[0]);
        }
        if (success) {
            document.getElementById("reviewsection").style.display = "none";
            alert("Review Submitted Successfully");
            dispatch(itemReviewReset());
            dispatch(fetchItemDetails(id));
            if(isAuthenticated && user.user.role ==="user"){
                dispatch(getmyallorders());
            }
            setRating(0);
            setComment("");
        }
    }, [dispatch, id, error, itemDetails.images, itemDetails, newItemReviewError, success, MyOrdersError,isAuthenticated,user]);

    const decrement = () => {
        if (quantity > 1) {
            setquantity(quantity - 1);
        }
        if (quantity === 1) {
            console.log("Minimum 1 quantity");
        }
    }
    const increment = () => {
        if (quantity < itemDetails.stock) {
            setquantity(quantity + 1);
        }
        if (quantity === itemDetails.stock) {
            console.log(`You can order this much quantity`);
        }
    }
    const addtocart = () => {
        dispatch(addItemsToCart(id, quantity)); //working correctly
        alert("Item Added to Cart");
    }

    const createreview = () => {
        document.getElementById("reviewsection").style.display = "flex";
    }
    const cancelreview = () => {
        document.getElementById("reviewsection").style.display = "none";
    }
    const submitreview = () => {
        let createdAt = new Date();
        dispatch(ItemReview({ itemId, rating, comment, createdAt }));
    }
    return (
        <>
            {loading || ItemReviewLoading || MyOrdersLoading ? (
                <Loader />
            ) : (
                <div className='productDetails'>
                    <ToastContainer />
                    <MetaData title={itemDetails.name} />
                    <div className="mainsection" id="mainsection">
                        <div className="subsection1">
                            <img src={currimg} alt="Main Img" className='part1' />
                            <div className='part2'>
                                <div className="imgsarray" id="imgsarray">
                                    {itemDetails.images?.map((img, index) => (
                                        <img src={img.Url} alt={`img${index}`} className='img' key={index} onClick={() => { setcurrimg(img.Url) }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="subsection2">
                            <h1>{itemDetails.name}</h1>
                            <div className="ratings">
                                <StarRating rating={itemDetails.ratings} />
                                <span> {itemDetails.ratings} Ratings & {itemDetails.numOfReviews} Reviews</span>
                            </div>
                            <div className="subsection3">
                                <div className="pricesection">
                                    {itemDetails.discount > 0 && (
                                        <div className="discount">
                                            Discount Price
                                        </div>)}
                                    <div className="allprices">
                                        {itemDetails.discount ? (
                                            <>
                                                <span>Rs. {itemDetails.price - itemDetails.price * `0.${itemDetails.discount}`}/-</span>
                                                <span className='orignalprice'>Rs. {itemDetails.price}/-</span>
                                                {itemDetails.discount > 0 && (<span className='discount'>{itemDetails.discount}% off</span>)}
                                            </>
                                        ) : (
                                            <span>Rs. {itemDetails.price}/-</span>
                                        )}
                                    </div>
                                </div>
                                <div className="statusSection">
                                    <span>Status :
                                        {itemDetails.stock >= 1 ? (<span style={{ color: "green" }}> In Stock</span>) : (<span style={{ color: "red" }}> Not In Stock</span>)}
                                    </span>
                                </div>
                            </div>
                            <div className="subsection4">
                                <div className="quantity">
                                    <button onClick={decrement}>-</button>
                                    {quantity}
                                    <button onClick={increment}>+</button>
                                </div>
                                <div className="addcart">
                                    <button disabled={itemDetails.stock < 1 ? true : false} onClick={addtocart}>Add to cart</button>
                                </div>
                            </div>
                            <div className="description"><b>Description :</b>  {itemDetails.description}.</div>

                            {isAuthenticated && user.user.role === "user" && myorders.orders && myorders.orders.map((order) => 
                                order.Itemsorder.map((item) => 
                                    item.product === id && order.orderStatus==="Delivered" &&  (
                                        <div className="submitreview">
                                            <button onClick={createreview}>Submit Review</button>
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    </div>
                    <div className="allreviewsection">
                        <h1>Reviews</h1>
                        {itemDetails.reviews && itemDetails.reviews.length > 0 ? (
                            <div className="reviewsarray">
                                {itemDetails.reviews.map((userReview) => (
                                    <ReviewComponent userReview={userReview} key={userReview._id} />
                                ))}
                            </div>
                        ) : (
                            <div className="noreview">
                                <h3>No Reviews</h3>
                            </div>
                        )}
                    </div>

                    <div className="reviewsection" id='reviewsection'>
                        <div className="reviewbox">
                            <h3>Submit Review</h3>
                            <h4>OverAll Rating</h4>
                            <form className="rating">
                                <label>
                                    <input type="radio" name="stars" value="1" onChange={(e) => setRating(e.target.value)} />
                                    <span className="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="2" onChange={(e) => setRating(e.target.value)} />
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="3" onChange={(e) => setRating(e.target.value)} />
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="4" onChange={(e) => setRating(e.target.value)} />
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="5" onChange={(e) => setRating(e.target.value)} />
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                    <span className="icon">★</span>
                                </label>
                            </form>
                            <textarea name="review" id="" placeholder='Add a Review' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                            <div className="reviewbtns">
                                <button onClick={cancelreview}>Cancel</button>
                                <button onClick={submitreview}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductDetails