import axios from "axios";
import { AddToCartRequest } from "../Store/Slices/addToCart";

export const addItemsToCart = (id,quantity) => async(dispatch)=>{
    try {
        const { data } = await axios.get(`/api/v1/item/${id}`);
        console.log(data);
        dispatch(AddToCartRequest({data,quantity}))
    } catch (error) {
        
    }
}