import React from 'react'

export default function AllListings() {
  return (
    <div>
    <table className="table table-success table-striped-columns">
      <thead>
        <tr>
          <th scope="col">SN</th>
          <th scope="col">Img</th>
          <th scope="col"></th>
          <th scope="col">Message</th> {/* Corrected from 'See Listings' */}
          <th scope='col'>Actions</th> {/* Updated header */}
        </tr>
      </thead>
      <tbody>
        {/* {contacts.map((cont, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{cont.name}</td>
            <td>{cont.email}</td>
            <td>{cont.message}</td>
            <td>
            <button className='btn btn-outline-danger' onClick={() => deleteContact(cont._id)}>Delete Message</button>
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  </div>

  )
}
