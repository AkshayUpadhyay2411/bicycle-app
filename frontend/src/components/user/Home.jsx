import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { getAllBicycles, rentBicycle, getAvailableBicycles } from "../../api/index"; // Import the API functions

function Home() {
  // Function to fetch all bicycles from the server
  const [bicycles, setBicycles] = useState([]);

  // Function to fetch all bicycles from the server
  const fetchAvailableBicycles = async () => {
    try {
      const response = await getAvailableBicycles();
      setBicycles(response.data);
    } catch (error) {
      console.log("Error fetching bicycles: ", error);
    }
  };

  // Function to handle renting a bicycle
  const handleRent = async (bicycleId) => {
    try {
      await rentBicycle(bicycleId);
      // After renting the bicycle, fetch the updated list of bicycles
      fetchAvailableBicycles();
    } catch (error) {
      console.log("Error renting bicycle: ", error);
    }
  };
  useEffect(() => {
    // Fetch the list of bicycles when the component mounts
    fetchAvailableBicycles();
  }, []);

  return (
    <div>
      <h1>All Bicycles Available for Rent</h1>
      <div className="bicycle-list">
        {bicycles.map((bicycle) => (
          <Card key={bicycle.bicycle_id} className="mb-3">
            <Card.Body>
              <Card.Title>{bicycle.bicycle_name}</Card.Title>
              <Card.Text>Cost per Hour: {bicycle.cost_per_hour}</Card.Text>
              <Button onClick={() => handleRent(bicycle.bicycle_id)}>
                Rent
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Home;

