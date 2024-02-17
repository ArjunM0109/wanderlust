import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./rating.css";
import { useAuth } from '../Store/Auth';

const ReviewForm = ({id ,fetchData}) => {
  const {user} = useAuth();
  const UserId = user._id;
  const [formData, setFormData] = useState({
    rating: 1,
    comment: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const response = await fetch(`http://localhost:3030/Review/${UserId}/add/${id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }); 
      if(response.ok){
        toast.success("Review Submitted successfully");
        // Reset form after submission
        setFormData({
          rating: 1,
          comment: ''
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error in Registration time:', error);
    }
  };

  const handleRatingChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      rating: parseInt(value)
    });
  };

  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <> 
    {user && (
    <div className="col-8 offset-2 mb-3">
      <h4>Leave a Review</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating" className="form-label text-dark">
          Rating:
        </label>
        <fieldset className="starability-slot" required>
          <input type="radio" id="no-rate" className="input-no-rate" name="rating" value="0" checked={formData.rating === 0} onChange={handleRatingChange} aria-label="No rating." />
          <input type="radio" id="first-rate1" name="rating" value="1" checked={formData.rating === 1} onChange={handleRatingChange} />
          <label htmlFor="first-rate1" title="Terrible">1 star</label>
          <input type="radio" id="first-rate2" name="rating" value="2" checked={formData.rating === 2} onChange={handleRatingChange} />
          <label htmlFor="first-rate2" title="Not good">2 stars</label>
          <input type="radio" id="first-rate3" name="rating" value="3" checked={formData.rating === 3} onChange={handleRatingChange} />
          <label htmlFor="first-rate3" title="Average">3 stars</label>
          <input type="radio" id="first-rate4" name="rating" value="4" checked={formData.rating === 4} onChange={handleRatingChange} />
          <label htmlFor="first-rate4" title="Very good">4 stars</label>
          <input type="radio" id="first-rate5" name="rating" value="5" checked={formData.rating === 5} onChange={handleRatingChange} />
          <label htmlFor="first-rate5" title="Amazing">5 stars</label>
        </fieldset>

        <div className="mt-3 mb-3 w-50">
          <label htmlFor="comment" className="form-label text-dark">
            Comments:
          </label>
          <textarea
            name="comment"
            id="comment"
            cols="5"
            rows="5"
            className='form-control'
            onChange={handleCommentChange}
            value={formData.comment}
            required
          ></textarea>
          <button className="btn btn-outline-dark my-3" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
    )}
    </>
  );
};

export default ReviewForm;
