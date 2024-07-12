import { createOrderFail, createOrderRequest, createOrderSuccess,clearError, myorderRequest, myorderFail, myorderSuccess } from "../Store/Slices/Order"
import axios from "axios";
import { OrderDetailsFail, OrderDetailsRequest, OrderDetailsSuccess } from "../Store/Slices/OrderDetails";

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

//Get All Orders
export const getmyallorders = ()=>async(dispatch)=>{
    try {
        dispatch(myorderRequest());
        const {data} = await axios.get("/api/v3/myorders");
        // console.log(data); 
        dispatch(myorderSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(myorderFail(error.response.data.message));
    }
};

//Get Single Order
export const getOrderDetails = (id)=>async(dispatch)=>{
    try {
        dispatch(OrderDetailsRequest());
        const {data} = await axios.get(`/api/v3/order/${id}`);
        // console.log(data); 
        dispatch(OrderDetailsSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(OrderDetailsFail(error.response.data.message));
    }
};