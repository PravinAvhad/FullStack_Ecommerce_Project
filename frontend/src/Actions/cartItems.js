import axios from "axios";
import { AddToCartRequest, RemoveFromCartRequest, saveShippingInfo } from "../Store/Slices/Cart";

//Add Items To Cart
export const addItemsToCart = (id,quantity) => async(dispatch,getState)=>{
    try {
        const { data } = await axios.get(`/api/v1/item/${id}`);
        dispatch(AddToCartRequest({data,quantity}));
        localStorage.setItem("cartItems",JSON.stringify(getState().Cart.cartItems));
    } catch (error) {
        
    }
}

//Remove Items To Cart
export const RemoveItem = (id)=> async(dispatch,getState)=>{
    try {
        dispatch(RemoveFromCartRequest(id));
        localStorage.setItem("cartItems",JSON.stringify(getState().Cart.cartItems));
    } catch (error) {
        
    }
}

//Save Shipping Information
export const ShippingInfosaved = (data)=>async(dispatch,getState)=>{
    try {
        dispatch(saveShippingInfo(data));
        localStorage.setItem("shippingInfo",JSON.stringify(getState().Cart.shippinginfo));
    } catch (error) {
        
    }
}