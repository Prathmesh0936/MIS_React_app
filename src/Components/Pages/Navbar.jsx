import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/Navbar.css';
import axios from 'axios';

export default function CustomNavbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  // Set isLoggedIn based on localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // !! converts to true/false
  }, []);

  // Fetch user roles
  useEffect(() => {
    const fetchRoles = async () => {
      const email = localStorage.getItem('email');
      const token = localStorage.getItem('token');

      if (email && token) {
        try {
          const response = await axios.get(`http://localhost:8080/api/auth/roles/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setRoles(response.data);
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      }
    };

    if (isLoggedIn) {
      fetchRoles();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setRoles([]);
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Invoice</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>

            <NavDropdown title="Profile" id="basic-nav-dropdown">
              {isLoggedIn ? (
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
