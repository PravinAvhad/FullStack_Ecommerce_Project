import {createSlice} from "@reduxjs/toolkit";

const AdminGetUsers=createSlice({
    name:"AdminGetUsers",
    initialState:{adminAllUsers:[]},
    reducers:{
        adminallusersRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminallusersSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminAllUsers: action.payload,
            }
        },
        adminallusersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return {
                ...state,
                error:null,
            }
        },
    }
})
export default AdminGetUsers.reducer;
export const {adminallusersRequest,adminallusersSuccess,adminallusersFail,clearError} = AdminGetUsers.actions;