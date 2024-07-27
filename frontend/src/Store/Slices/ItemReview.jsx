import {createSlice} from "@reduxjs/toolkit";

const ItemReview=createSlice({
    name:"ItemReview",
    initialState:{itemReview:{}},
    reducers:{
        itemReviewRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        itemReviewSuccess(state,action){
            return{
                // ...state,
                loading:false,
                success: action.payload,
            }
        },
        itemReviewFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        itemReviewReset(state,action){
            return{
                ...state,
                loading:false,
                success:false,
                // error:null
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
export default ItemReview.reducer;
export const {itemReviewRequest,itemReviewSuccess,itemReviewFail,itemReviewReset,clearError} = ItemReview.actions;