// ApprovedRequests.jsx
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getApprovedReturnRequests } from "../../api/index";

const ApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    // Load approved return requests when the component mounts
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const data = await getApprovedReturnRequests();
      setApprovedRequests(data.data);
      console.log("finalised requests by the admin  -> ", data.data);
    } catch (error) {
      // Handle error
      console.log("Error fetching approved return requests:", error.message);
    }
  };

  return (
    <div>
      <h1>Approved Return Requests</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Rental ID</th>
            <th>Request ID</th>
            <th>Bicycle Name</th>
            <th>User who Rented</th>
            <th>Admin who Approved Rent Request</th>
            <th>Admin who Approved Return Request</th>
            <th>Rent Request Approved Time</th>
            <th>Return Request Approved Time</th>
            <th>Cost Per Hour</th>
            <th>Total Cost Paid by User</th>
          </tr>
        </thead>
        <tbody>
          {approvedRequests.map((request) => (
            <tr key={request.return_id}>
              <td>{request.return_id}</td>
              <td>{request.rental_id}</td>
              <td>{request.request_id}</td>
              <td>{request.bicycle_name}</td>
              <td>{request.user_id}</td>
              <td>{request.approved_by_admin_id_rent}</td>
              <td>{request.approved_by_admin_id_return}</td>
              <td>{new Date(request.request_approved_time_rent).toLocaleString()}</td>
              <td>{new Date(request.request_approved_time_return).toLocaleString()}</td>
              <td>{request.cost_per_hour}</td>
              <td>{request.total_cost_paid}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApprovedRequests;
