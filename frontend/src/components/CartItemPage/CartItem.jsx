import React from 'react'
import "./cartItem.css";
import { useDispatch } from 'react-redux';
import { addItemsToCart, RemoveItem } from '../../Actions/cartItems';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
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
        // <Link to={`/product/${item.data.item._id}`} className="cartItem">
        <div className="cartItem">
            <div className="cartItemsub1">
                <img src={item.data.item.images ? item.data.item.images[0].Url : "./Profile.jpeg"} alt="Item Image" />
                <div className="itemdetails">
                    <h2>{item.data.item.name}</h2>
                    <div className="pricessection">
                        <h3>Price : </h3>
                        <div className="prices">
                            {item.data.item.discount ? (
                                <>
                                <span className='orignalprice'>Rs. {item.data.item.price * item.quantity} /- </span>
                                <span>Rs. {(item.data.item.price - item.data.item.price*`0.${item.data.item.discount}`)*item.quantity} /-</span>
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