import React, { useState, useEffect } from 'react';
import { useAuth } from '../Store/Auth';


const ListingDetails = ({ listingDetails, handleEditClick, handleDeleteClick }) => {
  const {user} = useAuth();
  if (!listingDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-8 offset-2">
      <h3 className="offset-2 mt-3">{listingDetails.title}</h3>
      <div className="card col-8 offset-2 listing-card">
        <img src={listingDetails.image} className="card-img-top show-img" alt="..." />
        <div className="card-body">
          <p className="card-text mt-3">Owned by : <i>{listingDetails.owner.name}...{listingDetails.owner._id}</i></p>
          <p className="card-text">{listingDetails.description}</p>
          <p className="card-text">Price: &#8377; {listingDetails.price.toLocaleString("en-IN")}</p>
          <p className="card-text">Location: {listingDetails.location}</p>
        </div>
      </div>
        {user && user._id === listingDetails.owner._id && (
        <div className="btns">
          <button onClick={handleEditClick} className="btn btn-info offset-2">Edit</button>
          <button onClick={handleDeleteClick} className="btn btn-danger mx-3">Delete-Listing</button>
        </div>
        )}
      <hr />
    </div>
  );
};

export default ListingDetails;
