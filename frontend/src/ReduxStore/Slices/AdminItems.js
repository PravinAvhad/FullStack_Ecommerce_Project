import {createSlice} from "@reduxjs/toolkit";

const AdminItems=createSlice({
    name:"AdminItems",
    initialState:{adminItems:[]},
    reducers:{
        adminItemsRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminItemsSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminItems: action.payload.items,
            }
        },
        adminItemsFail(state,action){
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
export default AdminItems.reducer;
export const {adminItemsRequest,adminItemsSuccess,adminItemsFail,clearError} = AdminItems.actions;