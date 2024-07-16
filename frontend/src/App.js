import './App.css';
import Header from "./components/Layout/Navbar/Header.jsx"
import Footer from "./components/Layout/Footer/Footer.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx"
import Products from "./components/Products/Products.jsx"
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.jsx"
import { useEffect, useState } from 'react';
import { loaduser } from './Actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx';
import Profile from './components/Profile/Profile.jsx';
import UpdatePassword from "./components/UpdatePassword/UpdatePassword.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import Cart from "./components/CartPage/Cart.jsx";
import ShippingInformation from "./components/Shipping/ShippingInformation.jsx";
import SuccessOrder from "./components/SuccessOrder/SuccessOrder.jsx";
import MyOrders from "./components/MyOrders/MyOrders.jsx"
import OrderDetail from "./components/OrderDetail/OrderDetail.jsx";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard.jsx";
import AdminAllProducts from "./components/Admin/AllProducts/AllProducts.jsx";
import AdminNewProduct from "./components/Admin/NewProduct/NewProduct.jsx";
import AdminOrders from './components/Admin/Orders/Orders.jsx';
import AdminAllUsers from "./components/Admin/AllUsers/AllUsers.jsx";
import AdminReviews from "./components/Admin/Reviews/Reviews.jsx";

import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user, error } = useSelector((state) => state.User);

  const [stripeKey, setStripeKey] = useState("");
  const getStripeApiKey = async () => {
    try {
      const { data } = await axios.get(`/api/v4/stripeapikey`); //error 
      setStripeKey(data.StripeApiKey);
      // console.log("Stripe API Key in App.js : ",stripeKey);
    } catch (error) {
      console.log("Stripe Api key : ", error.response.data.message);
    }
  }
  useEffect(() => {
    if (error) {
      toast.error(error); //this is not working properly
    }
    dispatch(loaduser());
    getStripeApiKey();
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          {/* For Searching Product */}
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/products/filter/:category' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/password/forget' element={<ForgetPassword />} />
          <Route path='/cart' element={<Cart />} />
          {!loading && isAuthenticated && (
            <>
              <Route path="/myaccount" element={<Profile />} />
              <Route path='/myaccount/update' element={<UpdateProfile />} />
              <Route path='/password/update' element={<UpdatePassword />} />
              {stripeKey && (
                <Route path='/checkout' element={<ShippingInformation stripeApiKey={stripeKey} />} />
              )}
              <Route path="/success" element={<SuccessOrder />} />
              <Route path='/myorders' element={<MyOrders/>}/>
              <Route path='/order/:id' element={<OrderDetail/>} />
            </>
          )}
          {!loading && isAuthenticated && user.user.role==="admin" && (
            <>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/allproducts" element={<AdminAllProducts />} />
              <Route path="/admin/newproduct" element={<AdminNewProduct />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/allusers" element={<AdminAllUsers />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>);
}

export default App;
