import React, { useEffect } from 'react'
import './home.css'
import ProductCard from "../ProductCard/ProductCard.jsx"
import MetaData from '../Layout/MetaData.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader.jsx'
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getitems } from '../../Actions/itemAction.js'
import Products from '../Products/Products.jsx'

const Home = () => {
  const dispatch = useDispatch();

  const { loading, items, itemsCount,error } = useSelector(state => state.Items);

  // const clearErrors = () => {
  //   dispatch(clearError());
  // }
  const scrollfunc = () => {
    const elementToView = document.getElementById("products");
    elementToView.scrollIntoView();
  }
  useEffect(() => {
    dispatch(getitems());
    if(error){
      toast.error(error);
    }
  }, [dispatch])

  return (
    <div className='home'>
      <ToastContainer/>
      {loading ? (<Loader/>) : 
      (
        <div className=''>
      <MetaData title = "Ecommerce"/>
      <div className="homesection1">
        <div className="midcontent">
          <h1>Welcome To Ecommerce Website</h1>
          <p className='homesection1p'>Find Amazing Products Below</p>
          <button onClick={scrollfunc} className='homesection1scrollbtn'>
            Scroll
          </button>
        </div>
      </div>
      <div className="homesection2" id='products'>
        <div className="headingsection">
          <h2 className='homesection2h2'>Featured Prducts</h2>
        </div>
        <div className="allproducts">
          {
            items && items.map((item) => (
              <ProductCard item={item} key={item._id}/>
            ))
          }
        </div>
      </div>
      </div>)
    }
    </div>
  )
}

export default Home;
