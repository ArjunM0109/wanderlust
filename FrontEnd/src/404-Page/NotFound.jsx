// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import './NotFound.css'; // Import CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/"><button className='btn btn-outline-info'>Go to Homepage</button></Link> {/* Link to the homepage */}
      </div>
      <div className="astronaut"></div>
      <div className="moon"></div>
      <div className="crater"></div>
      <div className="spacerocks"></div>
    </div>
  );
};

export default NotFound;
