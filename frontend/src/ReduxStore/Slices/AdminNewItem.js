import {createSlice} from "@reduxjs/toolkit";

const AdminNewItem=createSlice({
    name:"AdminNewItem",
    initialState:{newitem:{}},
    reducers:{
        adminNewItemRequest(state,action){
            return{
                ...state,
                loading:true,
            }
        },
        adminNewItemSuccess(state,action){
            return{
                loading:false,
                newitem: action.payload,
            }
        },
        adminNewItemFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        adminNewItemReset(state,action){
            return{
                ...state,
                success:false,
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
export default AdminNewItem.reducer;
export const {adminNewItemRequest,adminNewItemSuccess,adminNewItemFail,adminNewItemReset,clearError} = AdminNewItem.actions;