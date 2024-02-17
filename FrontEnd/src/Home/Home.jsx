import React, { useState, useEffect } from 'react';
import ListingCards from './ListingCards';
import './Home.css';
import IconList from './IconList';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3030/Listings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res_data = await response.json();
      if (res_data.length === 0) {
        setHasMore(false);
      } else {
        setListings([...listings, ...res_data]);
        setPage(page + 1);
      }
    } catch (error) {
      console.log('Fetch error:', error);
    } finally {
      setIsLoading(false);
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
    </div>
    </>
  );
};

export default Home;
