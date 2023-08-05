import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { register } from "../../api/index.js";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    usertype: "user", // Default usertype is "user"
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register(formData);
      console.log(response.message); // For testing purposes
      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      // Handle registration error (e.g., show an error message)
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="usertype">
              <Form.Label>User Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="User"
                  name="usertype"
                  value="user"
                  checked={formData.usertype === "user"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Admin"
                  name="usertype"
                  value="admin"
                  checked={formData.usertype === "admin"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Link to="/login">Login</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
