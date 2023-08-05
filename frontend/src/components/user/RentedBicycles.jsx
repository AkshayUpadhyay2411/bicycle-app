import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getRentedBicycles, returnBicycle } from "../../api/index";

function RentedBicycles() {
  const [rentedBicycles, setRentedBicycles] = useState([]);

  useEffect(() => {
    fetchRentedBicycles();
  }, []);

  const fetchRentedBicycles = async () => {
    try {
      const response = await getRentedBicycles();
      console.log("rented bicycles -> ", response.data);
      setRentedBicycles(response.data);
    } catch (error) {
      console.log("Error fetching rented bicycles", error);
    }
  };

  const handleReturnBicycle = async (rentalId) => {
    try {
      await returnBicycle(rentalId);
      // After successfully returning the bicycle, fetch the updated list of rented bicycles
      fetchRentedBicycles();
    } 
    catch (error) {
      console.log("Error returning the bicycle", error);
    }
  };

  return (
    <Container>
      <h1>Rented Bicycles</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bicycle Name</th>
            <th>Cost per Hour</th>
            <th>Return</th>
          </tr>
        </thead>
        <tbody>
          {rentedBicycles.map((bicycle) => (
            <tr key={bicycle.rental_id}>
              <td>{bicycle.bicycle_name}</td>
              <td>{bicycle.cost_per_hour}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleReturnBicycle(bicycle.rental_id)}
                >
                  Return
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default RentedBicycles;
