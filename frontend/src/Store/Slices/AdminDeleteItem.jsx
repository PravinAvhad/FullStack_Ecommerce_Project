import {createSlice} from "@reduxjs/toolkit";

const AdminDeleteItem=createSlice({
    name:"AdminDeleteItem",
    initialState:{Deleted:{}},
    reducers:{
        adminDeleteRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminDeleteSuccess(state,action){
            return{
                ...state,
                loading:false,
                Deleted:action.payload,
            }
        },
        adminDeleteFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminDeleteReset(state,action){
            return{
                ...state,
                Deleted:false,
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
export default AdminDeleteItem.reducer;
export const {adminDeleteRequest,adminDeleteSuccess,adminDeleteFail,adminDeleteReset,clearError} = AdminDeleteItem.actions;