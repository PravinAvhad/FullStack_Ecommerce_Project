import { createSlice } from "@reduxjs/toolkit";

const Profile = createSlice({
    name: "Profile",
    initialState: { user: {} },
    reducers: {
        UpdateProfileRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        UpdateProfileSuccess(state,action){
            return{
                ...state,
                loading: false,
                isUpdated:action.payload,
            }    
        },
        UpdateProfileFail(state,action){
            return{
                ...state,
                loading: false,
                error:action.payload,
            }            
        },
        UpdateProfileReset(state,action){
            return{
                ...state,
                isUpdated:false            
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        },
        UpdatePasswordRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        UpdatePasswordSuccess(state,action){
            return{
                ...state,
                loading: false,
                isUpdated:action.payload,
            }    
        },
        UpdatePasswordFail(state,action){
            return{
                ...state,
                loading: false,
                error:action.payload,
            }            
        },
        UpdatePasswordReset(state,action){
            return{
                ...state,
                isUpdated:false            
            }
        },

    }
});

export default Profile.reducer;
export const {UpdateProfileRequest,UpdateProfileSuccess,UpdateProfileFail,UpdateProfileReset,clearError,UpdatePasswordRequest,UpdatePasswordSuccess,UpdatePasswordFail,UpdatePasswordReset} = Profile.actions;