import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

function LogOut() {
  const { loggedIn, logOut } = useAuth();

  return (
    loggedIn
      ? (
        <Button variant="outline-secondary" size="sm" onClick={logOut}>
          Выйти
        </Button>
      )
      : null
  );
};

function NavBar() {
  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container className="gap-2">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        <LogOut />
      </Container>
    </Navbar>
  );
};

export default NavBar;
