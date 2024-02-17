import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from './Form';
import { toast } from 'react-toastify';
import {useAuth} from '../Store/Auth';

const EditListing = () => {
  const {user} = useAuth();
  const UserId = user._id;
  const { id } = useParams();
  const navigate = useNavigate();

  const [listingDetails, setListingDetails] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    location: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", id);
        const response = await fetch(`http://localhost:3030/Listings/List/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json"
          },
        });

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;
  
    // Convert price to a number if the id is 'price'
    if (id === 'price') {
      newValue = parseFloat(value); // Convert to float or parseInt(value) for integer
    }
  
    // Validate if the id is 'location' and the value is not a number
    if (id === 'location' && !isNaN(value)) {
      // If the value is a number, clear it
      newValue = '';
    }
  
    // Update the state with the new value
    setListingDetails((prevDetails) => ({
      ...prevDetails,
      [id]: newValue,
    }));
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Listing details before submit:", listingDetails.title);
    try {
      const response = await fetch(`http://localhost:3030/Listings/${UserId}/List/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(listingDetails),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Listing updated successfully!");
        navigate(`/Listing/${id}`); 
      }else{
        console.log(data);
        toast.warning(data.extraDetails || data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  

  return (
    <Form handleSubmit={handleSubmit} handleChange={handleChange} listingDetails={listingDetails} />
  );
};

export default EditListing;