import {createSlice} from "@reduxjs/toolkit";

const AdminItems=createSlice({
    name:"AdminItems",
    initialState:{adminItems:[]},
    reducers:{
        adminItemsRequest(state,action){
            return{
                loading:true,
                adminItems:[]
            }
        },
        adminItemsSuccess(state,action){
            return{
                loading:false,
                adminItems: action.payload.items,
            }
        },
        adminItemsFail(state,action){
            return{
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