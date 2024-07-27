import React, { useState } from 'react'
import StarRating from '../ProductCard/StarRating'
import "./review.css";

const ReviewComponent = ({ userReview }) => {
    let date = new Date(userReview.createdAt);
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    let createdAt = `${day}/${month}/${year}`
    const [data, setData] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim fugit expedita, labore veritatis");
    return (
        <div className="review">
            <div className="reviewsub1">
                <img src="/Profile.jpeg" alt="User Review Profile" />
                <div className="reviewusername">
                    <h3>{userReview.name}</h3>
                    <h4>{createdAt}</h4>
                </div>
            </div>
            <StarRating rating={userReview.rating} />
            <p>{userReview.comment}</p>
        </div>
    )
}

export default ReviewComponent