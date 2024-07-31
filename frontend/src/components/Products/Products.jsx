import React, { useEffect, useState } from 'react'
import "../Home/home.css"
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader.jsx'
import { toast } from "react-toastify";
import ProductCard from '../ProductCard/ProductCard.jsx'
import { getitems } from '../../Actions/itemAction.js';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import MetaData from '../Layout/MetaData.jsx'
import { clearError } from '../../ReduxStore/Slices/items.js';

const Products = () => {
    const dispatch = useDispatch();
    const { keyword,category } = useParams();
    const { loading, itemsdetails, itemsCount, error, itemsPerPage,itemsFilteredCnt } = useSelector(state => state.Items);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const setCurrentPage = (e) => {
        setCurrentPageNo(e);
    }
    
    useEffect(() => {
        dispatch(getitems(keyword, currentPageNo,category));
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
    }, [dispatch, keyword, currentPageNo,error,category]);
    return (
        <>
            {loading ? (<Loader />) :
                (<div className="homesection3" id='products'>
                    <MetaData title="Ecommerce All Products" />
                    <div className="headingsection">
                        <h2 className='homesection2h2'>Prducts</h2>
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
                            (itemsPerPage < itemsFilteredCnt) && (
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
                )}
        </>
    )
}

export default Products