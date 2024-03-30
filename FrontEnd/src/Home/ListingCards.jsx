// ListingCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ListingCards = ({ listing }) => { 
  return (
    <Link to={`/Listing/${listing._id}`} className="listing-link">
      <div className="card listing-card">
        <img src={listing.imageUrl} className="card-img-top" alt="..." style={{ height: '20rem' }} />
        <div className="card-img-overlay"></div>
        <div className="card-body">
          <p className="card-text">
            <b>{listing.title}</b>
            <br />
            {listing.price.toLocaleString('en-IN')} / night <br />
            <b>{listing.country}</b>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCards;
