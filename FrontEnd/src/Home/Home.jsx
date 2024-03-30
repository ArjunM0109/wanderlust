import React, { useState, useEffect } from 'react';
import ListingCards from './ListingCards';
import './Home.css';
import IconList from './IconList';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1); // Add page state
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false); // Initialize open state

  useEffect(() => {
    fetchData();
  }, [page]); // Fetch data whenever page changes

  const fetchData = async () => {
    try {
      setOpen(true); // Open backdrop when fetching starts
      const response = await fetch(`http://localhost:3030/Listings?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res_data = await response.json();
      setListings([...listings, ...res_data]); // Append new listings to existing ones
    } catch (error) {
      console.log('Fetch error:', error);
    } finally {
      setOpen(false); // Close backdrop when fetching completes
      setIsLoading(false); // Set loading to false when fetch is completed
    }
  };

  return (
    <>
      <div className="container">
        <IconList/>
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 my-3">
          {listings.map((listing) => (
            <ListingCards key={listing._id} listing={listing} />
          ))}
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={() => setOpen(false)} // Close backdrop if clicked
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default Home;
