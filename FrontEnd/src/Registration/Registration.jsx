import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../Store/Auth';
import { toast } from 'react-toastify';
import "./Registration.css";

export default function Registration() {
  const navigate = useNavigate(); // Initialize navigate here
  const { storeTokenInLocalStorage }= useAuth();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3030/User/Registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
 
      const data = await response.json();
      console.log(data.msg+" "+ data.extraDetails);
      if(response.ok){
        storeTokenInLocalStorage(data.token);
        setFormData({ email: '', name: '', phone: '', password: ''});
        toast.success("User Registered successfully");
        navigate("/");
      }else{
        toast.error(data.extraDetails || data.message);
      }
    } catch (error) {
      console.error('Error in Registration time:', error);
    }
  };

  return (
    <>
      <div className="container-fluid log">
        <div className="login-div bg-gradient">
          <form onSubmit={handleSubmit}>
            <h4 className="text-center mb-4">Sign-Up</h4>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">Password</label>
              <input type="password" className="form-control" id="pass" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
