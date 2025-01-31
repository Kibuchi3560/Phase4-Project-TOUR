import React, { useEffect, useState } from 'react';
import './Card.css';
import placeholderherojpg from './placeholder-hero.jpg'

const ReviewsCard = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3>PAST YEARS REVIEWS</h3>
        <img 
      src={placeholderherojpg} 
      alt="Travel Tips" 
      style={{
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
      }} 
    />
        <p>Our Past Reviewers</p>
        <div className="reviews-preview">
          {reviews.slice(0, 3).map(review => (
            <div key={review.id} className="review-item">
              <span>⭐ {review.rating}/5</span>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default ReviewsCard;