import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AdminContects() {
  const [contacts, setContacts] = useState([]);

  const deleteContact = async (contId) => {
    try {
      const response = await fetch(`http://localhost:3030/Admin/Contacts/${contId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        // Filter out the deleted contact from the contacts state
        setContacts(contacts.filter(contact => contact._id !== contId));
        toast.success("Contact deleted successfully");
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllUsersData = async () => {
    try {
      const response = await fetch('http://localhost:3030/Admin/Contacts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } else {
        toast.error("Error from server side");
      }
    } catch (error) {
      console.log(error);
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
            <th scope="col">Message</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((cont, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{cont.name}</td>
              <td>{cont.email}</td>
              <td>{cont.message}</td>
              <td>
                <button className='btn btn-outline-danger' onClick={() => deleteContact(cont._id)}>Delete Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
