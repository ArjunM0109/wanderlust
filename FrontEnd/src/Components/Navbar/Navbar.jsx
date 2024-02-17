import React, { useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Store/Auth';
import { FaSearch, FaUser } from 'react-icons/fa'; // Importing Font Awesome icons
import "./Navbar.css";


const Navbar = () => {
  const [userName, setUserName] = useState("UserName");
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark sticky-top">
      <div className="container-fluid mx-3">
        <NavLink className="navbar-brand" to="/">
        <i class="fa-regular fa-compass mx-2"></i>
          Wanderlust
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-3">
            <NavLink className="nav-link" exact="true" to="/">
              Home
            </NavLink>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/AddNewListing">
                Add-New Listing
              </NavLink>
            </li>
          </ul>


          <div className="navbar-nav ms-auto">
          <form class="d-flex" role="search">
          <input class="form-control me-1" type="search" placeholder="Search Destination" aria-label="Search"/>
          <button class="btn btn-search d-flex align-items-center" type="submit"><FaSearch size={15}/><span className='ms-2'>Search</span></button>
        </form>
          </div>


          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-3">
            {isLoggedIn ?
              (
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown mx-3">
                      <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser size={20} color="rgb(31, 101, 145)" className="mt-auto" /> {/* Added icons */}
                        <b>{userName}</b>
                      </a>
                      <ul className="dropdown-menu">
                      {user && user.isAdmin && <li>
                        <NavLink className="nav-link" to="/isAdmin">
                            <p className="dropdown-item">Admin Pennal</p>
                          </NavLink> </li>}                        <li className="nav-item">
                          <NavLink className="nav-link" to="/logout">
                            <p className="dropdown-item">Logout</p>
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/registration">
                      Registration
                    </NavLink>
                  </li>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
