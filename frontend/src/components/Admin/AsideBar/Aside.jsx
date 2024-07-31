import React, { useState } from 'react'
import "./aside.css"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';

const Aside = () => {
  const [toggle, settoggle] = useState(false);
  return (
    <div className="aside">
      <div className="asidebox">
        <Link to="/" className='linktags'>Home</Link>
        <Link to="/admin/dashboard" className='linktags'>Dashboard</Link>
        <button onClick={() => settoggle(!toggle)} className='button'>Products
          {toggle ? (
            <FontAwesomeIcon icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </button>
        {toggle && (
          <div className="productsbox">
            <Link to="/admin/allproducts" className='linktags small'><FontAwesomeIcon icon={faCircle} className='logo' />
              All Products</Link>
            <Link to="/admin/newproduct" className='linktags small'><FontAwesomeIcon icon={faCircle} className='logo' />Create Product</Link>
          </div>
        )
        }
        <Link to="/admin/orders" className='linktags'>Orders</Link>
        <Link to="/admin/allusers" className='linktags'>Users</Link>
        <Link to="/admin/reviews" className='linktags'>Reviews</Link>
      </div>
      <div className="mobileasidebox">
        <Link to="/" className='mobilelinks'>Home</Link>
        <Link to="/admin/dashboard" className='mobilelinks'>Dashboard</Link>
        <Link to="/admin/orders" className='mobilelinks'>Orders</Link>
        <div className="lastlinks">
          <button onClick={() => settoggle(!toggle)}>Products
            {toggle ? (
              <FontAwesomeIcon icon={faChevronRight} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
          {toggle && (
            <div className="mobproductsbox">
              <Link to="/admin/allproducts" className='moblinks'><FontAwesomeIcon icon={faCircle} className='moblogos' />
                All Products</Link>
              <Link to="/admin/newproduct" className='moblinks'><FontAwesomeIcon icon={faCircle} className='moblogos' />Create Product</Link>
            </div>
          )
          }
        </div>
        <Link to="/admin/allusers" className='mobilelinks lastlinks'>Users</Link>
        <Link to="/admin/reviews" className='mobilelinks lastlinks'>Reviews</Link>
      </div>
      <div className="smmobile">
      <Link to="/admin/allusers" className='smlinks'>Users</Link>
        <div className="">
          <button onClick={() => settoggle(!toggle)}>Products
            {toggle ? (
              <FontAwesomeIcon icon={faChevronRight} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
          {toggle && (
            <div className="mobproductsbox">
              <Link to="/admin/allproducts" className='moblinks'><FontAwesomeIcon icon={faCircle} className='moblogos' />
                All Products</Link>
              <Link to="/admin/newproduct" className='moblinks'><FontAwesomeIcon icon={faCircle} className='moblogos' />Create Product</Link>
            </div>
          )
          }
        </div>
        <Link to="/admin/reviews" className='smlinks'>Reviews</Link>
      </div>
    </div>
  )
}

export default Aside