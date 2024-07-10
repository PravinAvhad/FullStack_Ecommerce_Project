import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
    name: "Cart",
    initialState: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippinginfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
        // shippinginfo: localStorage.getItem("ShippingInfo") ? JSON.parse(localStorage.getItem("ShippingInfo")) : {
        //     address: "",
        //     city: "",
        //     pincode: "",
        //     mobileno: "",
        //     Country: "",
        //     state: "",
        // },
    },
    reducers: {
        AddToCartRequest(state, action) {
            const item = action.payload; //data,its quantity
            const isItemExist = state.cartItems.find((i) => i.data.item._id === item.data.item._id);
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i, index) =>
                        i.data.item._id === isItemExist.data.item._id ? item : i
                    )
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        },
        RemoveFromCartRequest(state, action) {
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.data.item._id !== action.payload),
            }
        },
        saveShippingInfo(state, action) {
            return {
                ...state,
                shippinginfo: action.payload,
            }
        }
    }
})

export default Cart.reducer;
export const { AddToCartRequest, RemoveFromCartRequest, saveShippingInfo } = Cart.actions