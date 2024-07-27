import React from 'react'
import "./productcard.css"
import { Link } from "react-router-dom"
import StarRating from './StarRating'

const ProductCard = ({ item }) => {
  let itemobj = item.images[0];
  return (
    <Link to={`/product/${item._id}`} className='item'>
      <img src={itemobj && itemobj.Url}
        alt={item.name} className='itemimg' />
      <h3 className='itemname'>{item.name.substr(0,15)}...</h3>
      <div className="itemrating">
        <StarRating rating={item.ratings}/>
        <span className='itemreviews'>({item.numOfReviews} Reviews)</span>
      </div>
      <span className='itemprice'>Rs. {item.price} /-</span>
    </Link>
  )
}

export default ProductCard
