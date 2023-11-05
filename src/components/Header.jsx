import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Navbar bg="light" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Link className='text-decoration-none pe-2' to="/">Home</Link>
            <Link className='text-decoration-none pe-2' to="/login">Login</Link>
            <Link className='text-decoration-none pe-2' to="/register">Register</Link>
            <Link className='text-decoration-none' to="/dashboard">Dashboard</Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header