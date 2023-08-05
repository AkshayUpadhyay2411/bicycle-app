import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {logout} from "../../api/index";
import Cookies from "js-cookie";
function Header({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout= () =>{
    setIsAuthenticated(false);
     logout();
  }
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Bicycle Renting App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
               <Nav.Link as={Link} to="/add-bicycle">Add Bicycle</Nav.Link>
               <Nav.Link as={Link} to="/pending-requests">
              Pending Requests
            </Nav.Link>
            {
              Cookies.get("usertype")==="user"?
            (<Nav.Link as={Link} to="/rented-bicycles">
              Rented Bicycles
            </Nav.Link>):
            (<Nav.Link as={Link} to="/approved-requests">
              Approved requests
            </Nav.Link>)

            }
            <Nav.Link as={Link} to="/pending-returns">
                Pending Returns
            </Nav.Link>
            {
               Cookies.get("usertype")==="user"?
               (<Nav.Link as={Link} to="/rent-complete-info">
                 Rented Bicycles
               </Nav.Link>):
               (<Nav.Link as={Link} to="/approved-returns">
                 Approved Returns
               </Nav.Link>)
            }
           
              <Nav.Link as={Link} to="/logout" onClick={handleLogout}>
                Logout
              </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
