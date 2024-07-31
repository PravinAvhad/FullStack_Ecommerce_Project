import {createSlice} from "@reduxjs/toolkit";

const AdminReviews=createSlice({
    name:"AdminReviews",
    initialState:{adminReviews:[]},
    reducers:{
        adminReviewsRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminReviewsSuccess(state,action){
            return{
                ...state,
                loading:false,
                adminReviews: action.payload,
            }
        },
        adminReviewsFail(state,action){
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
export default AdminReviews.reducer;
export const {adminReviewsRequest,adminReviewsSuccess,adminReviewsFail,clearError} = AdminReviews.actions;