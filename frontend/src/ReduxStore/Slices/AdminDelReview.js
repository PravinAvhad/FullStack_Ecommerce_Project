import {createSlice} from "@reduxjs/toolkit";

const AdminDelReview=createSlice({
    name:"AdminDelReview",
    initialState:{state:{}},
    reducers:{
        adminDeleteReviewRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminDeleteReviewSuccess(state,action){
            return{
                ...state,
                loading:false,
                isDeleted:action.payload.success,
            }
        },
        adminDeleteReviewFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminDeleteReviewReset(state,action){
            return{
                ...state,
                isDeleted:false,
            }
        },
        clearReviewError(state,action){
            return {
                ...state,
                error:null
            }
        },
    }
})
export default AdminDelReview.reducer;
export const {adminDeleteReviewRequest,adminDeleteReviewSuccess,adminDeleteReviewFail,adminDeleteReviewReset,clearReviewError} = AdminDelReview.actions;