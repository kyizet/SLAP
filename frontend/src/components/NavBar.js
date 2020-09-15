import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const cookies = new Cookies();
    if (cookies.get("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <MDBNavbar color="unique-color-dark" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">SLAP</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/shop">Shop</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/forum">Forum</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/help">Help</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/changelog">ChangeLogs</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>

        {isLoggedIn ? (
          <MDBNavbarNav right className="pr-5">
            <MDBNavItem>
              <MDBNavLink to="/accountprofile">Profile</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/logout">Logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        ) : (
          <MDBNavbarNav right className="pr-5">
            <MDBNavItem>
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/register">Register</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        )}
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default NavBar;
