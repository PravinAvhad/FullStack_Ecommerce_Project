import React from 'react';
import ReactStars from 'react-stars';
import "./productcard.css";

const StarRating = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      size={24}
      color2={'#ffd700'}  // color of the stars
      edit={false}  // makes the stars read-only
      className='reactstars'
    />
  );
};

export default StarRating;