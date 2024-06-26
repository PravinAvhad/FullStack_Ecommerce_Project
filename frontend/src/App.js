import './App.css';
import Header from "./components/Layout/Navbar/Header.jsx"
import Footer from "./components/Layout/Footer/Footer.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home.jsx"
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx"
import Products from "./components/Products/Products.jsx"
import LoginSignUp from "./components/LoginSignUp/LoginSignUp.jsx"
import { useEffect } from 'react';
import { loaduser } from './Actions/userActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx';
import Profile from './components/Profile/Profile.jsx';
import UpdatePassword from "./components/UpdatePassword/UpdatePassword.jsx";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated,loading, user, error } = useSelector((state) => state.User);

  useEffect(() => {
    if (error) {
      toast.error(error); //this is not working properly
    }
    dispatch(loaduser());
  }, []);
  
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
          {!loading && isAuthenticated && (
            <>
              <Route path="/myaccount" element={<Profile />} />
              <Route path='/myaccount/update' element={<UpdateProfile />} />
              <Route path='/password/update' element={<UpdatePassword />} />
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>);
}

export default App;
