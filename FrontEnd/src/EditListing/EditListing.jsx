import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './Form';
import { toast } from 'react-toastify';
import { useAuth } from '../Store/Auth';
import axios from 'axios';

const EditListing = () => {
  const { user } = useAuth();
  const UserId = user ? user._id : '';
  const { id } = useParams();
  const navigate = useNavigate();

  const [listingDetails, setListingDetails] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    location: '',
    file: null,
  });
  const [loading, setLoading] = useState(false); // State for submission loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3030/Listings/List/${id}`);
        if (!response.ok) {
          throw new Error(`Server returned ${response.status} - ${response.statusText}`);
        }
        const res_data = await response.json();
        setListingDetails(res_data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    setListingDetails({ ...listingDetails, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event) => {
    setListingDetails({ ...listingDetails, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', listingDetails.title);
      formDataToSend.append('description', listingDetails.description);
      formDataToSend.append('price', listingDetails.price);
      formDataToSend.append('location', listingDetails.location);
      formDataToSend.append('file', listingDetails.file);

      const response = await axios.put(`http://localhost:3030/Listings/${UserId}/List/${id}`, formDataToSend);
      if (response.status === 200) {
        console.log('Listing update successfully:', response.data);
        toast.success('Listing submitted successfully');
        navigate(`/Listing/${id}`);
      } else {
        console.error('Error updating listing:', response.statusText);
        toast.error(response.statusText || 'Failed to update listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to update listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form handleSubmit={handleSubmit} handleInputChange={handleInputChange} listingDetails={listingDetails} handleImageUpload={handleImageUpload} />
       {/* Loader */}
       {loading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditListing;
