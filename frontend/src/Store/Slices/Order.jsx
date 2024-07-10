import { createSlice } from "@reduxjs/toolkit";

const Order = createSlice({
    name:"Orders",
    initialState:{order:{}},
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
        }
    }
});

export default Order.reducer;
export const {createOrderRequest,createOrderSuccess,createOrderFail,clearError} = Order.actions;