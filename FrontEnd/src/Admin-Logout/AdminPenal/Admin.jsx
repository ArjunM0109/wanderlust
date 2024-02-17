import React from 'react';
import { FaHome, FaUsers, FaEnvelope, FaList } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import "./Admin.css";

export default function Admin() {
  return (
    <>
      <h4 className="text-center mt-3 text-primary">Admin-dashboard </h4>
      <div className="container-fluid d-flex my-3">
        <div className="col-2 sidebar">
          <ul>
            <li><NavLink to="/"><FaHome className="react-icon" /> Home</NavLink></li>
            <li><NavLink to="/isAdmin/users"><FaUsers className="react-icon"/> All Users</NavLink></li>
            <li><NavLink to="/isAdmin/contacts"><FaEnvelope className="react-icon"/> Contacts</NavLink></li>
            <li><NavLink to="/isAdmin/listings"><FaList className="react-icon"/> All Listings</NavLink></li>
          </ul>
        </div>
        <div className="col-10 main-content mx-1">
          <Outlet/>
        </div>
      </div>
    </>
  );
}
