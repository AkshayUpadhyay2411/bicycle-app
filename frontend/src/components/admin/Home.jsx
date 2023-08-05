import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getAllBicycles, deleteBicycle } from "../../api/index";
import { Link } from "react-router-dom";

function Home() {
  const [bicycles, setBicycles] = useState([]);

  useEffect(() => {
    fetchAllBicycles();
  }, []);

  const fetchAllBicycles = async () => {
    try {
      const response = await getAllBicycles();
      setBicycles(response.data);
      console.log("data of cycles ", bicycles);
    } catch (error) {
      console.error("Error fetching bicycles:", error);
    }
  };

  const handleDelete = async (bicycleId) => {
    try {
      await deleteBicycle(bicycleId);
      // After deletion, fetch the updated list of bicycles
      fetchAllBicycles();
    } catch (error) {
      console.error("Error deleting bicycle:", error);
    }
  };

  return (
    <Container>
      <h2>All Bicycles</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bicycle ID</th>
            <th>Bicycle Name</th>
            <th>Cost per Hour</th>
            <th>Added By</th>
            <th>Created Time</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {bicycles.map((bicycle) => (
            <tr key={bicycle.bicycle_id}>
              <td>{bicycle.bicycle_id}</td>
              <td>{bicycle.bicycle_name}</td>
              <td>{bicycle.cost_per_hour}</td>
              <td>{bicycle.added_by_user_id}</td>
              <td>{bicycle.created_time}</td>
              <td>
                <Link to={`/editBicycle/${bicycle.bicycle_id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(bicycle.bicycle_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;
