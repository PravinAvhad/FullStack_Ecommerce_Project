import { configureStore } from '@reduxjs/toolkit'
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
import AdminUpDelItem from './Slices/AdminUpDelItem';
import AdminGetOrders from './Slices/AdminGetOrders';
import AdminUpDelOrder from './Slices/AdminUpDelOrder';
import AdminGetUsers from './Slices/AdminGetUsers';
import AdminUpDelUser from './Slices/AdminUpDelUser';
import ItemReview from './Slices/ItemReview';
import AdminReviews from './Slices/AdminReviews';
import AdminDelReview from './Slices/AdminDelReview';

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
    ItemReview:ItemReview,
    AdminItems:AdminItems,
    AdminNewItem:AdminNewItem,
    AdminUpDelItem:AdminUpDelItem,
    AdminGetOrders:AdminGetOrders,
    AdminUpDelOrder:AdminUpDelOrder,
    AdminGetUsers:AdminGetUsers,
    AdminUpDelUser:AdminUpDelUser,
    AdminReviews:AdminReviews,
    AdminDelReview:AdminDelReview
  }
});

export default store