// Form.js
import React from 'react';

const Form = ({ handleSubmit, handleChange, listingDetails }) => {
  return (
    <div className="container mt-5">
      <div className="row col-8 offset-2 border bg-light p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={listingDetails.email} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="title" value={listingDetails.title} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="description" value={listingDetails.description} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="price" value={listingDetails.price} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="image" className="col-sm-2 col-form-label">Image URL</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="image" value={listingDetails.image} onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="location" className="col-sm-2 col-form-label">Location</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="location" value={listingDetails.location} onChange={handleChange} />
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto mt-3">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
