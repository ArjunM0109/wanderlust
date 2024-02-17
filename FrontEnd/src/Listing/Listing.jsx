import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListingDetails from './ListingDetails';
import './CurrListing.css';
import { toast } from 'react-toastify';
import ReviewForm from '../Review/ReviewForm';
import AllReviews from '../Review/AllReview';
import { useAuth } from '../Store/Auth';

export default function Listing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3030/Listings/List/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Server error');
      }
      const resData = await response.json();
      setListingDetails(resData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false); // Update loading state regardless of success/failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/EditListing/${id}`);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:3030/Listings/List/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json"
        },
      });
      if(response.ok){
        toast.success("Listing Deleted successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Render loading spinner or error message if loading or listingDetails is null
  if (loading || !listingDetails) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  return (
    <>
      <ListingDetails
        listingDetails={listingDetails}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      <h4></h4>
      {user && <ReviewForm id={id} fetchData={fetchData}/>}
      <hr />

      <div className="container">
        <h4>All Reviews :</h4><br />
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-1 my-2">
          {listingDetails.reviews.map((review) => (
            <AllReviews key={review._id} ListingId={id} review={review} fetchData={fetchData}/>
          ))}
        </div>
      </div>
    </>
  );
}
