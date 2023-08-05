import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getPendingRentRequestsUser } from "../../api/index";

function PendingRequests() {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await getPendingRentRequestsUser();
      setPendingRequests(response.data);
      console.log("pending requests data",pendingRequests)
    } catch (error) {
      console.log("Error fetching pending requests:", error);
    }
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Bicycle Name</th>
            <th>Cost Per Hour</th>
            <th>Request Status</th>
            {/* Add more columns here as needed */}
          </tr>
        </thead>
        <tbody>
          {pendingRequests.map((request) => (
            <tr key={request.request_id}>
              <td>{request.request_id}</td>
              {/* <td>{request.bicycle_id}</td> */}
              <td>{request.bicycle_name}</td>
              <td>{request.cost_per_hour}</td>
              <td>{request.request_status}</td>
              {/* Add more columns here as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PendingRequests;
