import React from 'react'
import "./productcard.css"
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "#FFDF00",
    value: item.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 25,
  }

  return (
    <Link to={`/product/${item._id}`} className='item'>
      <img src={item.images[0].Url}
        alt="ProductImage" className='itemimg' />
      <h3 className='itemname'>{item.name}</h3>
      <div className="itemrating">
        <ReactStars {...options} />
        <span className='itemreviews'>({item.numOfReviews} Reviews)</span>
      </div>
      <span className='itemprice'>Rs. {item.price} /-</span>
    </Link>
  )
}

export default ProductCard
