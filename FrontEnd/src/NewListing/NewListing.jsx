import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../Store/Auth';
import 'react-toastify/dist/ReactToastify.css';
import './NewListing.css';

export default function NewListing() {
  const navigate = useNavigate(); // Initialize navigate here
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    location: "",
    country: "",
    file: null,
  });

  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageUpload = (event) => {
    setFormData({ ...formData, file: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set isLoading to true when submitting the form

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`http://localhost:3030/Listings/${user._id}/List/New`, formDataToSend);
      if (response.status === 201) {
        console.log('Listing submitted successfully:', response.data);
        toast.success('Listing submitted successfully');
        navigate('/');
      } else {
        console.error('Error creating listing:', response.statusText);
        toast.error(response.statusText || 'Failed to submit listing');
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after submission
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 bg-light">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label text-dark">Title:</label>
              <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label text-dark">Description:</label>
              <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleInputChange} required />
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="location" className="form-label text-dark">Location:</label>
                <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="country" className="form-label text-dark">Country:</label>
                <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label text-dark">Price:</label>
              <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleInputChange} required />
            </div> 
            <div className="mb-3">
              <label htmlFor="image" className="form-label text-dark">Select Image:</label>
              <input type="file" name='file' className="form-label border text-dark" id="file" onChange={handleImageUpload} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
    </div>
  );
}
