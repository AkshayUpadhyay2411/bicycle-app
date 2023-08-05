import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { getCompletedRentsInfo } from "../../api/index";

function RentCompleteInfo() {
  const [completedRentals, setCompletedRentals] = useState([]);

  useEffect(() => {
    fetchCompletedRentals();
  }, []);

  const fetchCompletedRentals = async () => {
    try {
      const response = await getCompletedRentsInfo();
      setCompletedRentals(response.data);
    } catch (error) {
      console.error("Error fetching completed rentals:", error);
    }
  };

  return (
    <Container>
      <h2>Completed Rent Info</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>User ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Cost</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {completedRentals.map((rental) => (
            <tr key={rental.rental_id}>
              <td>{rental.rental_id}</td>
              <td>{rental.user_id}</td>
              <td>{rental.start_date}</td>
              <td>{rental.end_date}</td>
              <td>{rental.total_cost}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default RentCompleteInfo;
