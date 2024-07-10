import React, { useEffect, useState } from 'react'
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCartShopping, faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { logoutuser } from '../../../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../Layout/Loader/Loader";
import { getitems } from '../../../Actions/itemAction'

const Header = ({ isAuthenticated, user }) => {
    const [sidebar, setSidebar] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState(["All Categories", "Electronics", "Furniture", "AutoMobile", "Vegetables", "Sports"]);
    const [category, setCategory] = useState("");
    // console.log(category);
    const [visiblecat, setVisibleCat] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector(state => state.Items);
    const sidebartoogle = () => {
        setSidebar(!sidebar);
        if (sidebar === false) {
            document.getElementById("aside").style.display = "block";
        }
        else {
            document.getElementById("aside").style.display = "none";
        }
    }
    // useEffect(() => {
    //     let arr = items.map((item) => item.category);
    //     let unique = [];
    //     arr.forEach(element => {
    //         if (!unique.includes(element)) {
    //             unique.push(element);
    //         }
    //     });
    //     setCategories(unique);
    // }, [items])
    const searchsumbitHandler = (e) => {
        e.preventDefault();
        // console.log("Keyword :", keyword);
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
            setKeyword("");
        }
        else {
            navigate(`/products`);
            setKeyword("");
        }
    }
    const logout = () => {
        dispatch(logoutuser());
        toast.success("Logout User Successfully");
        navigate("/");
    }
    const togglefunc = () => {
        setVisibleCat(!visiblecat);
    };
    const filterbycategory = (ipcat) => {
        togglefunc();
        sidebartoogle();
        if (ipcat === "All Categories") {
            navigate("/products");
        }
        if (ipcat !== "All Categories") {
            navigate(`/products/filter/${ipcat}`);
        }
    }
    // useEffect(() => {
    //     if(!keyword){
    //         filterbycategory();
    //     }
    // }, [category])

    return (
        <>
            {loading ? (<Loader />) : (
                <><ToastContainer />
                    <div className='navbar'>
                        <div className="navbarsection">
                            <div className="subpart1">
                                <Link to="/" className=" heading hover">Ecommerce</Link>
                            </div>
                            <div className="subpart2" icons >
                                <Link to="/products" className="navlinks hover">Products</Link>
                                <Link to="/contact" className="navlinks hover">Contact Us</Link>
                                <Link to="/about" className="navlinks hover">About</Link>
                            </div>
                            <div className="subpart3">
                                <div className="searchbar">
                                    <input type="text" name="" placeholder='Search' onChange={(e) => setKeyword(e.target.value)} id="searchinput" />
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icons hover' id="searchicon" onClick={searchsumbitHandler} />
                                </div>
                                <div className='iconname hover' onClick={()=>navigate(`/cart`)} style={{ paddingTop: '4px' }}>
                                    <FontAwesomeIcon icon={faCartShopping} className='profileicon' />
                                    <p>Cart</p>
                                </div>
                                <div className='iconname hover' id='toggle1' onClick={sidebartoogle} >
                                    {isAuthenticated ? (
                                        <img src={user.user.profileImg.Url ? user.user.profileImg.Url : "/Profile.jpeg"} className='profileimg' />
                                    ) : (<>
                                        <FontAwesomeIcon icon={faUser} className='profileicon' />
                                        <p>Profile</p> </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="navbarsection2">
                            <div className="mobilesearchbar">
                                <input type="text" name="" id="mobilesearchinput" required placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='icons hover' id='mobilesearchbtn' onClick={searchsumbitHandler} />
                            </div>
                        </div>
                        {isAuthenticated ? (
                            <div id='aside'>
                                <div className="asidesection">
                                    <div className="hellouser">
                                        <h2>Welcome</h2>
                                        <h2>{user.user.name}</h2>
                                    </div >
                                    {user.user.role === "admin" && (
                                        <Link to="/dashboard" className='sidebarbtns2'>Dashboard</Link>
                                    )}
                                    <Link to="/" className="sidebarbtns">Home</Link>
                                    <Link to="/products" className="sidebarbtns">Products</Link>
                                    <div className="filteropts">
                                        <div className="selectbtn" onClick={togglefunc}>
                                            <span>Category</span>
                                            {visiblecat ? (
                                                <div className="downarrow" style={{ transform: "rotate(180deg)" }}><FontAwesomeIcon icon={faChevronDown} /></div>
                                            ) : (
                                                <div className="downarrow"><FontAwesomeIcon icon={faChevronDown} /></div>
                                            )}
                                        </div>
                                        {visiblecat ? (
                                            <div className="content">
                                                <ul>
                                                    {categories.map((item, ind) => (
                                                        <li key={ind} onClick={() => { setCategory(item); filterbycategory(item) }}> {item}</li>
                                                    ))}
                                                </ul>
                                            </div>) : (<></>)}
                                    </div>
                                    <Link to="/myaccount" className='sidebarbtns2' onClick={sidebartoogle}>My Account</Link>
                                    <Link to="/orders" className='sidebarbtns2' onClick={sidebartoogle}>My Orders</Link>
                                    <Link to="/contact" className="sidebarbtns" onClick={sidebartoogle}>Contact Us</Link>
                                    {/* <Link to="/about" className="sidebarbtns">About</Link> */}
                                    <button className='sidebarbtns2' onClick={logout}>Log Out</button>
                                </div >
                            </div >
                        ) : (
                            <div id='aside'>
                                <div className="asidesection">
                                    <div className="hellouser">
                                        <h2>Hello User</h2>
                                        <p>To access your Ecommerce Account</p>
                                    </div >
                                    <Link to="/login" className='sidebarbtns2' onClick={sidebartoogle}>Sign In</Link>
                                    <Link to="/" className="sidebarbtns">Home</Link>
                                    <Link to="/products" className="sidebarbtns">Products</Link>
                                    <div className="filteropts">
                                        <div className="selectbtn" onClick={togglefunc}>
                                            <span>Category</span>
                                            {visiblecat ? (
                                                <div className="downarrow" style={{ transform: "rotate(180deg)" }}><FontAwesomeIcon icon={faChevronDown} /></div>
                                            ) : (
                                                <div className="downarrow"><FontAwesomeIcon icon={faChevronDown} /></div>
                                            )}
                                        </div>
                                        {visiblecat ? (
                                            <div className="content">
                                                <ul>
                                                    {categories.map((item, ind) => (
                                                        <li key={ind} onClick={() => { setCategory(item); filterbycategory(item) }}> {item}</li>
                                                    ))}
                                                </ul>
                                            </div>) : (<></>)}
                                    </div>
                                    {/* <div className="filterprice">
                                        <div className="pricename">
                                            <span>Price</span>
                                            <span style={{color:"blue"}}>Clear</span>
                                        </div>
                                        <div className="priceline">
                                            
                                        </div>
                                    </div> */}
                                    <Link to="/contact" className="sidebarbtns">Contact Us</Link>
                                    <Link to="/about" className="sidebarbtns">About</Link>
                                </div >
                            </div >
                        )}

                    </div >
                </>
            )};
        </>
    )
}

export default Header