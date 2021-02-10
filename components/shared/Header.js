import Link from "next/link";
import React, { useState } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import auth0 from "../../services/auth0";

const BsNavLink = (props) => {
  const { route, title } = props;
  return (
    <Link href={route}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  );
};

const Login = () => {
  return (
    <span onClick={auth0.login} className="nav-link port-navbar-link clickable">
      Login
    </span>
  );
};

const Logout = () => {
  return (
    <span
      onClick={auth0.logout}
      className="nav-link port-navbar-link clickable"
    >
      Logout
    </span>
  );
};

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { isAuthenticated, user, className } = props;

  return (
    <div>
      <Navbar
        className={`port-navbar port-nav-base absolute ${className}`}
        color="transparent"
        dark
        expand="md"
      >
        <NavbarBrand className="port-navbar-brand" href="/">
          Ryan Lewis
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className="port-navbar-brand">
              <BsNavLink route="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-brand">
              <BsNavLink route="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-brand">
              <BsNavLink route="/portfolios" title="Portfolio" />
            </NavItem>
            <NavItem className="port-navbar-brand">
              <BsNavLink route="/blog" title="Blog" />
            </NavItem>
            <NavItem className="port-navbar-brand">
              <BsNavLink route="/cv" title="CV" />
            </NavItem>
            {!isAuthenticated && (
              <NavItem className="port-navbar-brand">
                <Login />
              </NavItem>
            )}

            {isAuthenticated && (
              <NavItem className="port-navbar-brand">
                <Logout />
              </NavItem>
            )}
            {isAuthenticated && (
              <span className="nav-link port-navbar-link">{user.name}</span>
            )}
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
