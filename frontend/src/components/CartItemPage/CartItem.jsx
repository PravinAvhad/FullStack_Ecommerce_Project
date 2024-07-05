import React from 'react'
import "./cartItem.css";
import { useDispatch } from 'react-redux';
import { addItemsToCart, RemoveItem } from '../../Actions/cartItems';
const CartItem = ({item}) => {
    const dispatch = useDispatch();
    const increment = ()=>{
        const newQty = item.quantity + 1;
        if(item.data.item.stock <= item.quantity){
            return ;
        }
        dispatch(addItemsToCart(item.data.item._id,newQty));
    }
    const decrement = ()=>{
        const newQty = item.quantity - 1;
        if(item.quantity <=1){
            dispatch(RemoveItem(item.data.item._id));
        }
        else{
            dispatch(addItemsToCart(item.data.item._id,newQty));
        }
    }
    const remove = (id)=>{
        dispatch(RemoveItem(id));
    }
    return (
        <div className="cartItem">
            <div className="cartItemsub1">
                <img src={item.data.item.images ? item.data.item.images[0].Url :"./Profile.jpeg"} alt="Item Image" />
                <div className="itemdetails">
                    <h2>{item.data.item.name}</h2>
                    <div className="pricessection">
                        <h3>Price : </h3>
                        <div className="prices">
                            <span className='orignalprice'>{item.data.item.price * item.quantity} /- </span>
                            <span>{item.data.item.price*0.8*item.quantity} /-</span>
                            <span style={{ color: "green" }}>20% off</span>
                        </div>
                    </div>
                    <button onClick={()=> remove(item.data.item._id)}>Remove</button>
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