import { createOrderFail, createOrderRequest, createOrderSuccess,clearError } from "../Store/Slices/Order"
import axios from "axios";

export const createOrder = (order)=>async(dispatch)=>{
    try {
        dispatch(createOrderRequest());
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post("/api/v3/order/new",order,config);
        // console.log(data);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(createOrderFail(error.response.data.message));
    }
};
export const clear = ()=>async(dispatch)=>{
    dispatch(clearError());
}