import React, { useEffect, useState } from 'react';
import "./About.css";

export default function About() {
  const [postCount, setPostCount] = useState(0); // Initialize postCount state with a default value
  //const [uniqePost , setUniqeCount] = useState(0);
  const getAllData = async () => {
    try {
      const response = await fetch('http://localhost:3030/Listings/AllData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPostCount(data.totalListingCount); // Update postCount with the fetched data
        //setUniqeCount(data.countsByLocation);
      } else {
        console.log("Error from server side: ", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div className="about">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7 order-md-1">
            <h1 className="display-4 my-3">Why Choose Us?</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nobis cum minus repellendus molestias voluptatem maiores voluptate dicta ipsum qui?<br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, porro sapiente harum fuga unde optio quos. Dignissimos, architecto non! Omnis?<br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est similique iusto odio voluptas minus quas architecto asperiores ad quia. <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos nobis cum minus repellendus molestias voluptatem maiores voluptate dicta ipsum qui?<br />
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, porro sapiente harum fuga unde optio quos. Dignissimos, architecto non! Omnis?<br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore est similique iusto odio voluptas minus quas architecto asperiores ad quia. <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
