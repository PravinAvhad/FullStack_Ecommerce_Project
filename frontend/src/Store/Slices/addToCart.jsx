import { createSlice } from "@reduxjs/toolkit";

const AddToCart = createSlice({
    name: "AddToCart",
    initialState: { cartItems: [] },
    reducers: {
        AddToCartRequest(state, action) {
            const item = action.payload; //data,its quantity
            const isItemExist = state.addToCart.cartItems.find((i) => i.data.item._id === item._id);
            if (isItemExist) {
                return {
                    ...state,
                    exist:true
                    // cartItems:state.addToCart.cartItems.map((i)=> i.data.item._id === isItemExist.item._id ?  : i ),
                }
            }
            else {
                return {
                    ...state,
                    exist:false,
                    cartItems:[...state.cartItems,item],
                }
            }
        },
        AddToCartSuccess(state, action) {
            return {
                loading: false,
            }
        },
        AddToCartFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        }
    }
})

export default AddToCart.reducer;
export const { AddToCartRequest, AddToCartSuccess, AddToCartFail } = AddToCart.actions