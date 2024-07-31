import {createSlice} from "@reduxjs/toolkit";

const AdminGetOrders=createSlice({
    name:"AdminGetOrders",
    initialState:{adminOrders:[]},
    reducers:{
        adminOrdersRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminOrdersSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminOrders: action.payload,
            }
        },
        adminOrdersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return {
                ...state,
                error:null
            }
        },
    }
})
export default AdminGetOrders.reducer;
export const {adminOrdersRequest,adminOrdersSuccess,adminOrdersFail,clearError} = AdminGetOrders.actions;