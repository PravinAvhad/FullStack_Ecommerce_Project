import { createOrderFail, createOrderRequest, createOrderSuccess, clearError, myorderRequest, myorderFail, myorderSuccess } from "../Store/Slices/Order"
import axios from "axios";
import { OrderDetailsFail, OrderDetailsRequest, OrderDetailsSuccess } from "../Store/Slices/OrderDetails";
import { adminOrdersFail, adminOrdersRequest, adminOrdersSuccess } from "../Store/Slices/AdminGetOrders";
import { adminDelOrderFail, adminDelOrderRequest, adminDelOrderSuccess, adminUpdateOrderFail, adminUpdateOrderRequest, adminUpdateOrderSuccess } from "../Store/Slices/AdminUpDelOrder";

//Create Order - For User
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch(createOrderRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v3/order/new", order, config);
        // console.log(data);
        dispatch(createOrderSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(createOrderFail(error.response.data.message));
    }
};

export const clear = () => async (dispatch) => {
    dispatch(clearError());
}

//Get All Orders - For User - Id is passed from isAuthenticatedUser Function in Backend
export const getmyallorders = () => async (dispatch) => {
    try {
        dispatch(myorderRequest());
        const { data } = await axios.get("/api/v3/myorders");
        // console.log(data); 
        dispatch(myorderSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(myorderFail(error.response.data.message));
    }
};

//Get Single Order - For User
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch(OrderDetailsRequest());
        const { data } = await axios.get(`/api/v3/order/${id}`);
        // console.log(data); 
        dispatch(OrderDetailsSuccess(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(OrderDetailsFail(error.response.data.message));
    }
};

//Get All Orders - For Admin
export const admingetallOrders = () => async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const { data } = await axios.get(`/api/v3/admin/allorders`);
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message));
    }
}

//Update Order - For Admin Remaining
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch(adminUpdateOrderRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v3/admin/order/${id}`, order, config);
        dispatch(adminUpdateOrderSuccess(data.success));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(adminUpdateOrderFail(error.response.data.message));
    }
}

//Delete Order - For Admin Remaining
export const Orderdelete = (id) => async (dispatch) => {
    try {
        dispatch(adminDelOrderRequest());
        const { data } = await axios.delete(`/api/v3/admin/order/${id}`);
        // console.log(data);
        dispatch(adminDelOrderSuccess(data.success));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(adminDelOrderFail(error.response.data.message));
    }
};