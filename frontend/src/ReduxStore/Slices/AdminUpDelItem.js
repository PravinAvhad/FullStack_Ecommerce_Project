import {createSlice} from "@reduxjs/toolkit";

const AdminUpDelItem=createSlice({
    name:"AdminUpDelItem",
    initialState:{state:{}},
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
                Deleted:action.payload.success,
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
        clearError(state,action){
            return {
                ...state,
                error:null
            }
        },
    }
})
export default AdminUpDelItem.reducer;
export const {adminUpdateRequest,adminUpdateSuccess,adminUpdateFail,adminUpdateReset,adminDeleteRequest,adminDeleteSuccess,adminDeleteFail,adminDeleteReset,clearError} = AdminUpDelItem.actions;