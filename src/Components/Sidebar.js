import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import NavLink from "./SidebarNavItem";

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <IndexLinkContainer to="/" activeClassName="activeLink">
        <NavItem>{"Dashboard"}</NavItem>
      </IndexLinkContainer>
      <NavLink url="ABL/" textContent="ABL" />
      <NavLink url="Architect/" textContent="Architect" />
      <NavLink url="Cobas8000/" textContent="Cobas 8000" />
      <NavLink url="Cobas8100/" textContent="Cobas 8100" />
    </Nav>
  );
};

export default Sidebar;
