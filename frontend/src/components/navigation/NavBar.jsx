import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../../hooks/useAuth';

const LogOut = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    loggedIn
      ? (
        <Button className="btn-primary" onClick={logOut}>
          { t('logout') }
        </Button>
      )
      : null
  );
};

const NavBar = () => (
  <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <Container className="gap-2">
      <Link className="navbar-brand" to="/">Hexlet Chat</Link>
      <LogOut />
    </Container>
  </Navbar>
);

export default NavBar;
