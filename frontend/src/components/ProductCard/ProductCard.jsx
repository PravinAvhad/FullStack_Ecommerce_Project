import React from 'react'
import "./productcard.css"
import { Link } from "react-router-dom"
import StarRating from './StarRating'

const ProductCard = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`} className='item'>
      <img src={item.image.Url}
        alt={item.name} className='itemimg' />
      <h3 className='itemname'>{item.name.substr(0, 20)}...</h3>
      <div className="itemrating">
        <StarRating rating={item.ratings} />
        <span className='itemreviews'>({item.numOfReviews} Reviews)</span>
      </div>
      <div className="prices">
        <span className='itemprice'>Rs. {item.price} /-</span>
        <span className='itemprice'>Rs. {Math.round(item.price * `0.${100 - item.discount}`)} /-</span>
      </div>
      {/* <span className='itemprice'>Rs. {item.price} /-</span> */}
    </Link>
  )
}

export default ProductCard
