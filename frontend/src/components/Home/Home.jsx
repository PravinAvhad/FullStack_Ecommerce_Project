import React, { useEffect, useState } from 'react'
import './home.css'
import ProductCard from "../ProductCard/ProductCard.jsx"
import MetaData from '../Layout/MetaData.jsx'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader.jsx'
import { toast } from "react-toastify";
import { getitems } from '../../Actions/itemAction.js'
import Pagination from "react-js-pagination";
import { clearError } from '../../ReduxStore/Slices/items.js'

const Home = () => {
  const dispatch = useDispatch();

  const { loading, itemsdetails, itemsCount, error, itemsPerPage } = useSelector(state => state.Items);
  const scrollfunc = () => {
    const elementToView = document.getElementById("products");
    elementToView.scrollIntoView();
  }
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const setCurrentPage = (e) => {
    setCurrentPageNo(e);
  }
  useEffect(() => {
    dispatch(getitems("", currentPageNo));
    if (error) {
      toast.error(error,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      dispatch(clearError());
    }
  }, [dispatch, currentPageNo, error]);

  return (
    <div className='home'>
      {loading ? (<Loader />) :
        (
          <div className=''>
            <MetaData title="Ecommerce" />
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
                  itemsdetails && itemsdetails.map((item) => (
                    <ProductCard item={item} key={item._id} />
                  ))
                }
              </div>
              <div className="pagination">
                {
                  itemsPerPage < itemsCount && (
                    <Pagination
                      activePage={currentPageNo}
                      itemsCountPerPage={itemsPerPage}
                      totalItemsCount={itemsCount}
                      onChange={setCurrentPage}
                      nextPageText="Next"
                      prevPageText="prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass='page-item'
                      linkClass='page-link'
                      activeClass='pageItemActive'
                      activeLinkClass='pageLinkActive'
                    />
                  )
                }
              </div>
            </div>
          </div>)}
    </div>
  )
}

export default Home;
