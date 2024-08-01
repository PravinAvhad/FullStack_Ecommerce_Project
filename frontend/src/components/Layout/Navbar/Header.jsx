import React, { useState } from 'react'
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCartShopping, faUser, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { logoutuser } from '../../../Actions/userActions'
import { useDispatch } from 'react-redux'

const Header = ({ isAuthenticated, user }) => {
    const [sidebar, setSidebar] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [categories, setCategories] = useState(["All Categories", "Electronics", "Men's Wear", "Women's Wear", "Footwear", "Grocery", "Vegetables", "Sports", "Health, Supplements"]);
    const [category, setCategory] = useState("");
    const [visiblecat, setVisibleCat] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sidebartoogle = () => {
        setSidebar(!sidebar);
        if (sidebar === false) {
            document.getElementById("aside").style.display = "block";
        }
        else {
            document.getElementById("aside").style.display = "none";
        }
    }
    const searchsumbitHandler = (e) => {
        e.preventDefault();
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
        sidebartoogle();
        dispatch(logoutuser());
        toast.success("Log Out SuccessFully",{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
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

    return (
        <>
            <div className='navbar'>
                <div className="navbarsection">
                    <div className="subpart1">
                        <Link to="/" className=" heading hover">Ecommerce</Link>
                    </div>
                    <div className="subpart2" >
                        {isAuthenticated && user.user.role === "admin" ? (
                            <Link to="/admin/dashboard" className="navlinks hover">Dashboard</Link>
                        ) : (
                            <Link to="/" className="navlinks hover">Home</Link>
                        )}
                        <Link to="/products" className="navlinks hover">Products</Link>
                        <Link to="/about" className="navlinks hover">About</Link>
                    </div>
                    <div className="subpart3">
                        <div className="searchbar">
                            <input type="text" name="" placeholder='Search' onChange={(e) => setKeyword(e.target.value)} id="searchinput" />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icons hover' id="searchicon" onClick={searchsumbitHandler} />
                        </div>

                        {isAuthenticated ? (
                            user.user.role !== "admin" && (
                                <div className='iconname hover' onClick={() => navigate(`/cart`)} style={{ paddingTop: '4px' }}>
                                    <FontAwesomeIcon icon={faCartShopping} className='profileicon' />
                                    <p>Cart</p>
                                </div>
                            )
                        ) : (
                            <div className='iconname hover' onClick={() => navigate(`/cart`)} style={{ paddingTop: '4px' }}>
                                <FontAwesomeIcon icon={faCartShopping} className='profileicon' />
                                <p>Cart</p>
                            </div>)}

                        <div className='iconname hover' id='toggle1' onClick={sidebartoogle} >
                            {isAuthenticated ? (
                                <img src={user.user.profileImg.Url ? user.user.profileImg.Url : "/Profile.jpeg"} className='profileimg' alt="Profile Img" />
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
                    <div id='aside' onMouseLeave={() => document.getElementById("aside").style.display = "none"}>
                        <div className="asidesection">
                            <div className="hellouser">
                                <h2>Welcome</h2>
                                <h2>{user.user.name}</h2>
                            </div >
                            {user.user.role === "admin" && (
                                <Link to="/admin/dashboard" className='sidebarbtns' onClick={sidebartoogle}>Dashboard</Link>
                            )}
                            <Link to="/" className="sidebarbtns" onClick={sidebartoogle}>Home</Link>
                            <Link to="/products" className="sidebarbtns" onClick={sidebartoogle}>Products</Link>
                            <div className="filteropts">
                                <div className="selectbtn" onClick={togglefunc}>
                                    <h4>Category</h4>
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
                            {user.user.role !== "admin" && (
                                <Link to="/myorders" className='sidebarbtns2' onClick={sidebartoogle}>My Orders</Link>
                            )}
                            <button className='sidebarbtns2' onClick={logout}>Log Out</button>
                        </div >
                    </div >
                ) : (
                    <div id='aside' onMouseLeave={() => document.getElementById("aside").style.display = "none"}>
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
                            <Link to="/about" className="sidebarbtns">About</Link>
                        </div >
                    </div >
                )}
            </div >
        </>
    )
}

export default Header
