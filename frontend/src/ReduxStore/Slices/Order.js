import { createSlice } from "@reduxjs/toolkit";

const Order = createSlice({
    name:"Orders",
    initialState:{order:{},myorders:[]},
    reducers:{
        createOrderRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        createOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                order:action.payload
            }
        },
        createOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null,
            }
        },
        myorderRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        myorderSuccess(state,action){
            return{
                ...state,
                loading:false,
                myorders:action.payload
            }
        },
        myorderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        }
    }
});

export default Order.reducer;
export const {createOrderRequest,createOrderSuccess,createOrderFail,clearError,myorderRequest,myorderSuccess,myorderFail} = Order.actions;