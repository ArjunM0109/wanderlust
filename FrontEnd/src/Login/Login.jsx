import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify';
import "./Login.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const navigate = useNavigate();
  const { storeTokenInLocalStorage } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3030/User/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }); 
      const data = await response.json();
      if(response.ok){
        storeTokenInLocalStorage(data.token);
        toast.success("User Login successfully");
        navigate("/");
      }else{
        toast.error(data.extraDetails || data.message);
      }
    } catch (error) {
      console.error('Error in Registration time:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid log">
      <div className="login-div bg-gradient">
        <form className="login-form" onSubmit={handleSubmit}>
          <h4 className="text-center mb-4">Sign-In</h4>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email1" 
              name="email" 
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-danger" disabled={isLoading}>
              Sign In
            </button>
          </div>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading} // Show backdrop only when isLoading is true
            onClick={() => setIsLoading(false)} // Close backdrop if clicked
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </form>
      </div>
    </div>
  );
}
