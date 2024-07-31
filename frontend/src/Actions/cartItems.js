import axios from "axios";
import { AddToCartFail, AddToCartRequest, RemoveFromCartRequest, saveShippingInfo } from "../ReduxStore/Slices/Cart";

//Add Items To Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/item/${id}`);
        dispatch(AddToCartRequest({ data, quantity }));
        localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
    } catch (error) {
        dispatch(AddToCartFail(error.response.data.message));
    }
}

//Remove Items To Cart
export const RemoveItem = (id) => async (dispatch, getState) => {
    dispatch(RemoveFromCartRequest(id));
    localStorage.setItem("cartItems", JSON.stringify(getState().Cart.cartItems));
}

//Save Shipping Information
export const ShippingInfosaved = (data) => async (dispatch, getState) => {
    dispatch(saveShippingInfo(data));
    localStorage.setItem("shippingInfo", JSON.stringify(getState().Cart.shippinginfo));
}
