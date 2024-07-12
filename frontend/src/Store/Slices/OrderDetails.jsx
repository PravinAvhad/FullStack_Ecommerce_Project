import { createSlice } from "@reduxjs/toolkit";

const OrderDetails = createSlice({
    name:"OrderDetails",
    initialState:{OrderDetails:{}},
    reducers:{
        OrderDetailsRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        OrderDetailsSuccess(state,action){
            return{
                ...state,
                loading:false,
                OrderDetails:action.payload
            }
        },
        OrderDetailsFail(state,action){
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

export default OrderDetails.reducer;
export const {OrderDetailsRequest,OrderDetailsSuccess,OrderDetailsFail,clearError} = OrderDetails.actions;