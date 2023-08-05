import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { getPendingReturnRequests } from "../../api/index";

function PendingReturns() {
  const [returnRequests, setReturnRequests] = useState([]);

  useEffect(() => {
    fetchPendingReturnRequests();
  }, []);

  const fetchPendingReturnRequests = async () => {
    try {
      const response = await getPendingReturnRequests();
      console.log("pending requests data", response.data);
      setReturnRequests(response.data);
    } catch (error) {
      console.error("Error fetching pending return requests:", error);
    }
  };

  return (
    <Container>
      <h2>Pending Return Requests</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Rental ID</th>
            <th>Return Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {returnRequests.map((returnRequest) => (
            <tr key={returnRequest.return_id}>
              <td>{returnRequest.return_id}</td>
              <td>{returnRequest.rental_id}</td>
              <td>{returnRequest.return_date}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PendingReturns;
