import { configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools} from "redux-devtools-extension"
import Items from './Slices/items'
import Itemdetails from "./Slices/itemdetails"
import User from './Slices/User';
import Profile from './Slices/Profile';
import ForgetPassword from './Slices/ForgetPassword';
import Cart from './Slices/Cart';
import Order from './Slices/Order';

const store = configureStore({
  reducer: {
    Items: Items,
    ItemDetails: Itemdetails,
    User:User,
    Profile:Profile,
    ForgetPassword:ForgetPassword,
    Cart:Cart,
    Order:Order
  }
});

export default store
