import React from 'react';
import { toast } from 'react-toastify'; // Import toast from your toast library
import { useAuth } from '../Store/Auth';

import "./rating.css";

const AllReviews = ({ review, fetchData , ListingId }) => {
  const {user} = useAuth();
  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3030/Review/${ListingId}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }); 
      if (response.ok) {
        toast.success("Review Deleted successfully");
        fetchData(); // Call the function to refetch data
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error("Failed to delete review");
    }
  } 

  return (
    <>
      <div className="card my-3 mx-1" key={review._id}>
        <div className="card-body">
          <p className="card-text mt-3">
            <b>author: {review.author.name}</b><br />
            <p className="starability-result mt-1" data-rating={review.rating}>
              Rated: 3 stars
            </p>
            <b>Comment: {review.comment}</b><br />
          </p>
          { user && user._id && review.author._id === user._id && (
          <button className='btn btn-danger my-3' onClick={() => handleDeleteClick(review._id)}>Delete Review</button>
          )}
        </div>
      </div> 
    </>
  );
};

export default AllReviews;
