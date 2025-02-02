import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewForm = ({ userId, groups, selectedGroupId, refreshData }) => {
  const [reviewData, setReviewData] = useState({
    rating: '',
    comment: '',
    travelGroupId: selectedGroupId,
    site_id: 1
  });

  useEffect(() => {
    setReviewData((prev) => ({ ...prev, travelGroupId: selectedGroupId }));
  }, [selectedGroupId]);

  const handleReviewChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    const ratingValue = parseInt(reviewData.rating, 10);

    if (ratingValue < 1 || ratingValue > 5) {
      alert('Please select a rating between 1 and 5.');
      return;
    }

    const payload = {
      rating: ratingValue,
      comment: reviewData.comment.trim(),
      user_id: userId,
      site_id: reviewData.site_id,
      travel_group_id: reviewData.travelGroupId
    };

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert('Review submitted successfully!');
        setReviewData({ rating: '', comment: '', travelGroupId: selectedGroupId, site_id: reviewData.site_id });
        refreshData();
      } else {
        const errorData = await res.json();
        alert('Failed to submit review: ' + (errorData.error || 'Please try again later.'));
      }
    } catch (err) {
      alert('Error submitting review: ' + err.message);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-center">Leave a Review</h3>
          <form onSubmit={handleCreateReview}>
            {/* Rating Input */}
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating (1-5)</label>
              <input
                type="number"
                name="rating"
                id="rating"
                className="form-control"
                value={reviewData.rating}
                onChange={handleReviewChange}
                min="1"
                max="5"
                required
              />
            </div>

            {/* Comment Input */}
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Your Review</label>
              <textarea
                name="comment"
                id="comment"
                className="form-control"
                value={reviewData.comment}
                onChange={handleReviewChange}
                required
                placeholder="Share your experience..."
                rows="4"
              />
            </div>

            {/* Travel Group Dropdown */}
            <div className="mb-3">
              <label htmlFor="travelGroupId" className="form-label">Select Travel Group</label>
              <select
                name="travelGroupId"
                id="travelGroupId"
                className="form-select"
                value={reviewData.travelGroupId}
                onChange={handleReviewChange}
                required
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
