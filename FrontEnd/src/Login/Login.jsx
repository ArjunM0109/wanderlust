import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../Store/Auth';
 import { toast } from 'react-toastify';
import "./Login.css";

export default function Login() {
  const navigate = useNavigate(); // Initialize navigate here
  const { storeTokenInLocalStorage } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <button type="submit" className="btn btn-danger">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
