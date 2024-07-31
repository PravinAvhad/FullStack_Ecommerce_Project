import {createSlice} from "@reduxjs/toolkit";

const AdminUpDelOrder=createSlice({
    name:"AdminUpDelOrder",
    initialState:{state:{}},
    reducers:{
        adminUpdateOrderRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminUpdateOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isUpdatedOrder:action.payload,
            }
        },
        adminUpdateOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminUpdateOrderReset(state,action){
            return{
                ...state,
                isUpdatedOrder:false
            }
        },
        adminDelOrderRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminDelOrderSuccess(state,action){
            return{
                ...state,
                loading:false,
                isDeletedOrder:action.payload,
            }
        },
        adminDelOrderFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminDelOrderReset(state,action){
            return{
                ...state,
                isDeletedOrder:false
            }
        },
        clearErrors(state,action){
            return {
                ...state,
                error:null
            }
        },
    }
})
export default AdminUpDelOrder.reducer;
export const {adminUpdateOrderRequest,adminUpdateOrderSuccess,adminUpdateOrderFail,adminUpdateOrderReset,adminDelOrderRequest,adminDelOrderSuccess,adminDelOrderFail,adminDelOrderReset,clearError} = AdminUpDelOrder.actions;