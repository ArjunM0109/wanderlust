import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:3030/Admin/Users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.log("Error from server side: ", error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Delete User
  const deleteUser= async(id)=>{
    try {
      const response = await fetch(`http://localhost:3030/Admin/User/delete/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
      });
      if(response.ok){
        toast.success("User Deleted Successfully");
        getAllUsersData();
      }else{
        toast.warnning("some server side error");
      }
    } catch (error) {
      toast.info(error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div>
      <table className="table table-success table-striped-columns">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">See Listings</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((currUser, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{currUser.name}</td>
              <td>{currUser.email}</td>
              <td><button className='btn btn-outline-info'>See Listings</button></td>
              <td><button className='btn btn-outline-danger' onClick={()=>deleteUser(currUser._id)}>Delete User</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
