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
import Account from "./components/Account/Account.jsx";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector((state) => state.User);
  useEffect(() => {
      dispatch(loaduser());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} user={user} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:keyword' element={<Products />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/password/forget' element={<Home />} />
          <Route path="/myaccount" element={<Account/>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>);
}

export default App;
