import {createSlice} from "@reduxjs/toolkit";

const Items=createSlice({
    name:"Items",
    initialState:{items:[]},
    reducers:{
        allItemsRequest(state,action){
            return{
                loading:true,
                items:[]
            }
        },
        allItemsSuccess(state,action){
            return{
                loading:false,
                itemsdetails : action.payload.itemsdetails,
                itemsCount:action.payload.itemsCount,
                itemsFilteredCnt:action.payload.itemsFilteredCnt,
                itemsPerPage:action.payload.resultPerPage
            }
        },
        allItemsFail(state,action){
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
export default Items.reducer;
export const {allItemsRequest,allItemsSuccess,allItemsFail,clearError} = Items.actions;