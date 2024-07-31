import {createSlice} from "@reduxjs/toolkit";

const Itemdetails=createSlice({
    name:"ItemDetail",
    initialState:{itemDetails:{}},
    reducers:{
        itemDetailRequest(state,action){
            return{
                loading:true,
                ...state,
            }
        },
        itemDetailSuccess(state,action){
            return{
                ...state,
                loading:false,
                itemDetails: action.payload,
            }
        },
        itemDetailFail(state,action){
            return{
                loading:false,
                error:action.payload
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
export default Itemdetails.reducer;
export const {itemDetailRequest,itemDetailSuccess,itemDetailFail,clearErrors} = Itemdetails.actions;