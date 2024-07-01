import { createSlice } from "@reduxjs/toolkit";

const ForgetPassword = createSlice({
    name: "ForgetPassword",
    initialState: { user: {} },
    reducers: {
        ForgetPasswordRequest(state,action){
            return{
                ...state,
                loading:true,
                error:null
            }
        },
        ForgetPasswordSuccess(state,action){
            return{
                ...state,
                loading: false,
                message:action.payload,
            }    
        },
        ForgetPasswordFail(state,action){
            return{
                ...state,
                loading: false,
                error:action.payload,
            }            
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
});

export default ForgetPassword.reducer;
export const {ForgetPasswordRequest,ForgetPasswordSuccess,ForgetPasswordFail,clearError} = ForgetPassword.actions;