import React, { useEffect, useState } from 'react'
import "./productdetails.css"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Layout/Loader/Loader';
import ReactStars from "react-rating-stars-component"
import { fetchItemDetails } from '../../Actions/itemAction';
import { addItemsToCart } from '../../Actions/cartItems';
import MetaData from '../Layout/MetaData';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { itemDetails, loading, error } = useSelector(state => state.ItemDetails);
    const [quantity, setquantity] = useState(1);
    const [currimg,setcurrimg] = useState(itemDetails.images && itemDetails.images?.map(obj=>obj.Url)[0]); //Error in this line
    
    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error(error);
        }
        dispatch(fetchItemDetails(id));
    }, [dispatch,id,error]);
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
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#FFDF00",
        value: itemDetails.ratings,
        isHalf: true,
        size: window.innerWidth < 600 ? 15 : 25,
    }
    return (<>
        {loading ? (
            <Loader />
        ) : (
            <div className='productDetails'>
                <ToastContainer />
                <MetaData title={itemDetails.name} />
                <div className="mainsection">
                    <div className="subsection1">
                        <img src={currimg} alt="Main Img" className='part1'/>
                        <div className='part2'>
                            <div className="imgsarray" id="imgsarray">
                                {itemDetails.images?.map((img, index) => (
                                    <img src={img.Url} alt={`img${index}`} className='img' key={index} onClick={()=> {console.log("Image Changed"); setcurrimg(img.Url)}} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="subsection2">
                        <h1>{itemDetails.name}</h1>
                        <div className="ratings">
                            <ReactStars {...options} />
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
                        <div className="description">{itemDetails.description}.</div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}

export default ProductDetails