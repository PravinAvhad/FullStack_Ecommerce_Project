import React, { useState } from 'react'
import "./header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCartShopping, faUser, faBars } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { logoutuser } from '../../../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Header = ({ isAuthenticated, user }) => {
    const [sidebar, setSidebar] = useState(false);
    const dispatch = useDispatch();
    const sidebartoogle = () => {
        setSidebar(!sidebar);
        if (sidebar === false) {
            document.getElementById("aside").style.display = "block";
        }
        else {
            document.getElementById("aside").style.display = "none";
        }
    }
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchsumbitHandler = (e) => {
        e.preventDefault();
        console.log("Keyword :", keyword);
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }
        else {
            navigate(`/products`);
        }
    }
    const logout = () => {
        dispatch(logoutuser());
        toast.success("Logout User Successfully");
        navigate("/");
    }
    return (
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
                            <input type="text" name="" id="searchinput" placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='icons hover' onClick={searchsumbitHandler} />
                        </div>
                        <div className='iconname hover' onClick={sidebartoogle} style={{ paddingTop: '4px' }}>
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
                        <input type="text" name="" id="mobilesearchinput" placeholder='Search' onChange={(e) => setKeyword(e.target.value)} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='icons hover' id='mobilesearchbtn' onClick={searchsumbitHandler} />
                    </div>
                </div>
                {isAuthenticated ? (
                    <div id='aside'>
                        <div className="asidesection">
                            <div className="hellouser">
                                <h2>Welcome</h2>
                                <h2>{user.user.name}</h2>
                                {/* <p>To access your Ecommerce Account</p> */}
                            </div >
                            {user.user.role === "admin" && (
                                <Link to="/dashboard" className='sidebarbtns2'>Dashboard</Link>
                            )}
                            <Link to="/orders" className='sidebarbtns2'>Orders</Link>
                            <Link to="/myaccount" className='sidebarbtns2'>My Account</Link>
                            <button className='sidebarbtns2' onClick={logout}>Log Out</button>
                            <Link to="/" className="sidebarbtns">Home</Link>
                            <Link to="/products" className="sidebarbtns">Products</Link>
                            <Link to="/contact" className="sidebarbtns">Contact Us</Link>
                            <Link to="/about" className="sidebarbtns">About</Link>
                        </div >
                    </div >
                ) : (
                    <div id='aside'>
                        <div className="asidesection">
                            <div className="hellouser">
                                <h2>Hello User</h2>
                                <p>To access your Ecommerce Account</p>
                            </div >
                            <Link to="/login" className='sidebarbtns2'>Sign In</Link>
                            <Link to="/" className="sidebarbtns">Home</Link>
                            <Link to="/products" className="sidebarbtns">Products</Link>
                            <Link to="/contact" className="sidebarbtns">Contact Us</Link>
                            <Link to="/about" className="sidebarbtns">About</Link>
                        </div >
                    </div >
                )}

            </div >
        </>

    )
}

export default Header