import {createSlice} from "@reduxjs/toolkit";

const Itemdetails=createSlice({
    name:"Item",
    initialState:{itemDetails:{}},
    reducers:{
        itemDetailRequest(state,action){
            return{
                loading:true,
                ...state
            }
        },
        itemDetailSuccess(state,action){
            return{
                loading:false,
                fetchitemDetails: action.payload,
            }
        },
        itemDetailFail(state,action){
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
export default Itemdetails.reducer;
export const {itemDetailRequest,itemDetailSuccess,itemDetailFail,clearError} = Itemdetails.actions;