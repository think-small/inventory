import React from "react";
import { Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import NavLink from "./SidebarNavItem";

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar">
      <input type="text" placeholder="Search" style={{ padding: "20px",  height: "10px", width: "80%", margin: "20px 10px 10px 10px", borderRadius: "1px", border: "1px solid white"}} />
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
