import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import {composeWithDevTools} from "redux-devtools-extension"
import Items from './Slices/items'
import Itemdetails from "./Slices/itemdetails"
import User from './Slices/User';
import Profile from './Slices/Profile';
// import thunk from "redux-thunk"

const store = configureStore({
  reducer: {
    Items: Items,
    ItemDetails: Itemdetails,
    User:User,
    Profile:Profile
  }
});

export default store
