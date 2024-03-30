import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Store/Auth';
import { toast } from 'react-toastify';
import "./Footer.css";

export default function Footer() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  }); 

  useEffect(() => {
    if (user) {
      setFormData(prevState => ({
        ...prevState,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3030/Contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        toast.success("Contact form submitted successfully");
        setFormData({  message: '' });
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <footer className='border-top'>
      <div className="container-fluid mt-5">
        <div className="row">
          <h3 className="text-center cont">Contact-us</h3>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                className="form-control"
                id="message"
                name="message"
                placeholder="Enter your message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-success my-2" onClick={handleSubmit}>Submit</button>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="footer-info my-3">
              <div className="f-info-socials">
                <i className="fab fa-facebook-square"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="f-info-brand">&copy; Wanderlust private limited</div>
              <div className="f-info-links">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
