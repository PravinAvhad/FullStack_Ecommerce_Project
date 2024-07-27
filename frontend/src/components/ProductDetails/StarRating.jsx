import React from 'react';
import ReactStars from 'react-stars';

const StarRating = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      size={30}
      color2={'#ffd700'}  // color of the stars
      edit={false}  // makes the stars read-only
    />
  );
};

export default StarRating;