import React from 'react'
import "./cartItem.css";
import { useDispatch } from 'react-redux';
import { addItemsToCart, RemoveItem } from '../../Actions/cartItems';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const increment = () => {
        const newQty = item.quantity + 1;
        if (item.data.item.stock <= item.quantity) {
            return;
        }
        dispatch(addItemsToCart(item.data.item._id, newQty));
    }
    const decrement = () => {
        const newQty = item.quantity - 1;
        if (item.quantity <= 1) {
            dispatch(RemoveItem(item.data.item._id));
        }
        else {
            dispatch(addItemsToCart(item.data.item._id, newQty));
        }
    }
    const remove = (id) => {
        dispatch(RemoveItem(id));
    }
    return (
        <div className="cartItem">
            <div className="cartItemsub1">
                <img onClick={()=>navigate(`/product/${item.data.item._id}`)} src={item.data.item.images ? item.data.item.images[0].Url : "./Profile.jpeg"} alt="Product Img" />
                <div className="itemdetails">
                    <h2 onClick={()=>navigate(`/product/${item.data.item._id}`)}>{item.data.item.name}</h2>
                    <div className="pricessection">
                        <h3>Price : </h3>
                        <div className="prices">
                            {item.data.item.discount ? (
                                <>
                                <span className='orignalprice'>Rs. {Math.round(item.data.item.price * item.quantity)} /- </span>
                                <span>Rs. {Math.round((item.data.item.price - item.data.item.price*`0.${item.data.item.discount}`)*item.quantity)} /-</span>
                                <span style={{ color: "green" }}>{item.data.item.discount}% off</span>
                                </>
                            ) : (
                                <span>Rs. {item.data.item.price * item.quantity} /- </span>
                            )}

                        </div>
                    </div>
                    <button onClick={() => remove(item.data.item._id)}>Remove</button>
                </div>
            </div>
            <div className="cartItemsub2">
                <div className="quantity">
                    <button onClick={decrement}>-</button>
                    {item.quantity}
                    {/* {CartItem.quantity} */}
                    <button onClick={increment}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartItem