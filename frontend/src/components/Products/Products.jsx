import React, { useEffect, useState } from 'react'
import "../Home/home.css"
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Layout/Loader/Loader.jsx'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../ProductCard/ProductCard.jsx'
import { getitems } from '../../Actions/itemAction.js';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import MetaData from '../Layout/MetaData.jsx'

const Products = () => {
    const dispatch = useDispatch();
    const { keyword,category } = useParams();
    const { loading, items, itemsCount, error, itemsPerPage,itemsFilteredCnt } = useSelector(state => state.Items);
    // const clearErrors = () => {
    //     dispatch(clearError());
    // }
    // console.log(`keyword: ${keyword} & Category: ${category}`);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const setCurrentPage = (e) => {
        setCurrentPageNo(e);
    }
    useEffect(() => {
        dispatch(getitems(keyword, currentPageNo,category));
        if (error) {
            toast.error(error);
        }
    }, [dispatch, keyword, currentPageNo,error,category]);
    return (
        <>
            {loading ? (<Loader />) :
                (<div className="homesection3" id='products'>
                    <ToastContainer/>
                    <MetaData title="Ecommerce All Products" />
                    <div className="headingsection">
                        <h2 className='homesection2h2'>Prducts</h2>
                    </div>
                    <div className="allproducts">
                        {
                            items && items.map((item) => (
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
                                    totalItemsCount={itemsFilteredCnt}
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