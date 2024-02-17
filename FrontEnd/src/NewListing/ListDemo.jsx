import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NewListing.css';
import { useAuth } from '../Store/Auth';

export default function NewListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState({
    title: "",
    description: "",
    image: null, // Just store the file object directly
    price: 0,
    location: "",
    country: ""
  });
  const [imagePreview, setImagePreview] = useState(null); // to store the image preview

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value.trim(); // Trim whitespace
  
    // Convert price to a number if the id is 'price'
    if (id === 'price') {
      newValue = parseFloat(value); // Convert to float or parseInt(value) for integer
    }
  
    // Update the state with the new value
    setListing((prevListing) => ({
      ...prevListing,
      [id]: newValue,
    }));
  };
  
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setListing((prevListing) => ({
      ...prevListing,
      image: file
    }));
    // Store image preview
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3030/Listings/${user._id}/List/New`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing),
      });
      if (response.ok) {
        toast.success("Listing submitted successfully");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.extraDetails || errorData.message);
      }
    } catch (error) {
      console.error("Error submitting listing:", error);
      toast.error(`An error occurred while submitting the listing`);
    }
  }

  return (
    <div className="container-fluid new-bg">
      <div className="overlay"></div>
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-10 p-4 bg-gradient rounded z-1">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <h4 className="text-center mb-4">Add New Listing</h4>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" id="title" name="title" value={listing.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <input type="text" className="form-control" id="description" name="description" value={listing.description} onChange={handleChange} required />
            </div>
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="location" className="form-label">Location:</label>
                <input type="text" className="form-control" id="location" name="location" value={listing.location} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">Country:</label>
                <input type="text" className="form-control" id="country" name="country" value={listing.country} onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3">
            <label htmlFor="price" className="form-label">Price:</label>
            <input type="number" className="form-control" id="price" name="price" value={listing.price} onChange={handleChange} required />
            </div> 
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Select Image:</label>
              <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} required />
            </div>
            {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mb-3" width={"100PX"} />}
            <div className="d-grid gap-2 col-6 mx-auto mt-3">
              <button type="submit" className="btn btn-success mb-5">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
