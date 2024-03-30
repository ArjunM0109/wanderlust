import React from 'react';
import './Edit.css';

const Form = ({ handleSubmit, listingDetails, handleInputChange, handleImageUpload }) => {
  return (
    <div className="container mt-5 vh-100">
      <div className="row">
        <div className="col-lg-6">
          <img className='editImg' src={listingDetails.imageUrl} alt="" />
        </div>
        <div className="col-lg-6 bg-light p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3 row">
              <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="title" name="title" value={listingDetails.title} onChange={handleInputChange} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="description" name="description" value={listingDetails.description} onChange={handleInputChange} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
              <div className="col-sm-10">
                <input type="number" className="form-control" id="price" name="price" value={listingDetails.price} onChange={handleInputChange} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="image" className="col-sm-2 col-form-label">Select Img</label>
              <div className="col-sm-10">
                <input type="file" className="form-control" id="image" onChange={handleImageUpload} />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="location" className="col-sm-2 col-form-label">Location</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="location" name="location" value={listingDetails.location} onChange={handleInputChange} />
              </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-3">
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
