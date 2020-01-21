import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <LinkContainer to="/">
        <NavItem>Dashboard</NavItem>
      </LinkContainer>
      <LinkContainer to="/ABL/">
        <NavItem>ABL 825</NavItem>
      </LinkContainer>
      <LinkContainer to="/Architect/">
        <NavItem>Architect</NavItem>
      </LinkContainer>
      <LinkContainer to="/Cobas8000/">
        <NavItem>Cobas 8000</NavItem>
      </LinkContainer>
      <LinkContainer to="/Cobas8100/">
        <NavItem>Cobas 8100</NavItem>
      </LinkContainer>
    </Nav>
  );
};

export default Sidebar;
