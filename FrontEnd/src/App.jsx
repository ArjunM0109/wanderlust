import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import About from './About/About';
import AddNewListing from './NewListing/NewListing';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import NotFound from './404-Page/NotFound';
import Logout from './Admin-Logout/Logout/Logout';
import Admin from './Admin-Logout/AdminPenal/Admin';
import AdminUsers from './Admin-Logout/AdminPenal/AdminUsers';
import AdminContacts from './Admin-Logout/AdminPenal/AdminContects';
import Listing from './Listing/Listing';
import EditListing from './EditListing/EditListing';
import AllListings from './Admin-Logout/AdminPenal/AllListings';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/addNewListing" element={<AddNewListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/Listing/:id' element={<Listing />} />
          <Route path="/EditListing/:id" element={<EditListing />} />
          <Route path="/isAdmin" element={<Admin />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="listings" element={<AllListings/>}/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
