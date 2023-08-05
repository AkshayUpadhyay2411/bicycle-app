// pendingReturns.jsx
import React, { useEffect, useState } from "react";
import { getPendingReturnRequestsAdmin, approveReturnRequest } from "../../api/index";
import { Button, ListGroup } from "react-bootstrap";
const PendingReturns = () => {
  const [pendingReturns, setPendingReturns] = useState([]);

  useEffect(() => {
    // Load admin's pending return requests when the component mounts
    fetchPendingReturns();
  }, []);

  const fetchPendingReturns = async () => {
    try {
      const data = await getPendingReturnRequestsAdmin();
      console.log("peding return requests admin -> ", data.data);
      setPendingReturns(data.data);
    } catch (error) {
      // Handle error
      console.log("Error fetching admin's pending return requests:", error.message);
    }
  };

  const handleApproveReturnRequest = async (returnId) => {
    try {
      await approveReturnRequest(returnId);
      // Update the local state to reflect the change in status
      setPendingReturns((prevPendingReturns) =>
        prevPendingReturns.filter((returnRequest) =>
          returnRequest.return_id !== returnId
        )
      );
    } catch (error) {
      // Handle error
      console.log("Error approving return request:", error.message);
    }
  };

  return (
    <div>
    <h1>Pending Return Requests</h1>
    <ListGroup>
      {pendingReturns.map((request) => (
        <ListGroup.Item key={request.return_id}>
          <div>
            <strong>Return ID:</strong> {request.return_id}
          </div>
          <div>
            <strong>Rental ID:</strong> {request.rental_id}
          </div>
          <div>
            <strong>Bicycle ID:</strong> {request.bicycle_id}
          </div>
          <div>
            <strong>Bicycle Name: </strong> {request.bicycle_name}
          </div>
          <div>
            <strong>User ID:</strong> {request.user_id}
          </div>
          <Button onClick={() => handleApproveReturnRequest(request.return_id)} variant="success">
            Approve
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
  );
};

export default PendingReturns;
