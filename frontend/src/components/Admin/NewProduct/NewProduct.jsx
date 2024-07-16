import React from 'react'
import "./newProduct.css"
import Aside from '../AsideBar/Aside';

const NewProduct = () => {
  return (
    <div className="adminNewProduct">
        <Aside/>
        <div className="newProduct">
            New Product
        </div>
    </div>
  )
}

export default NewProduct;