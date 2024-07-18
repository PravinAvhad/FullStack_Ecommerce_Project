import {createSlice} from "@reduxjs/toolkit";

const AdminUpdateItem=createSlice({
    name:"AdminUpdateItem",
    initialState:{UpdatedItem:{}},
    reducers:{
        adminUpdateRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminUpdateSuccess(state,action){
            return{
                ...state,
                loading:false,
                Updated:action.payload.success,
            }
        },
        adminUpdateFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminUpdateReset(state,action){
            return{
                ...state,
                Updated:false,
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
export default AdminUpdateItem.reducer;
export const {adminUpdateRequest,adminUpdateSuccess,adminUpdateFail,adminUpdateReset,clearError} = AdminUpdateItem.actions;