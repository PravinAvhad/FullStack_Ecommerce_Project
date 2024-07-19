import { configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools} from "redux-devtools-extension"
import Items from './Slices/items'
import Itemdetails from "./Slices/itemdetails"
import User from './Slices/User';
import Profile from './Slices/Profile';
import ForgetPassword from './Slices/ForgetPassword';
import Cart from './Slices/Cart';
import Order from './Slices/Order';
import OrderDetails from './Slices/OrderDetails';
import AdminItems from './Slices/AdminItems';
import AdminNewItem from './Slices/AdminNewItem';
import AdminDeleteItem from './Slices/AdminDeleteItem';
import AdminUpdateItem from './Slices/AdminUpdateItem';
import AdminGetOrders from './Slices/AdminGetOrders';
import AdminUpDelOrder from './Slices/AdminUpDelOrder';

const store = configureStore({
  reducer: {
    Items: Items,
    ItemDetails: Itemdetails,
    User:User,
    Profile:Profile,
    ForgetPassword:ForgetPassword,
    Cart:Cart,
    Order:Order,
    OrderDetails:OrderDetails,
    AdminItems:AdminItems,
    AdminNewItem:AdminNewItem,
    AdminDeleteItem:AdminDeleteItem,
    AdminUpdateItem:AdminUpdateItem,
    AdminGetOrders:AdminGetOrders,
    AdminUpDelOrder:AdminUpDelOrder
  }
});

export default store
