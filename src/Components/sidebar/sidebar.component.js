import React from "react";
//  COMPONENT IMPORTS
import { Nav, NavItem } from "react-bootstrap";
import { IndexLinkContainer } from "react-router-bootstrap";
import NavLink from "../sidebar-nav-item/sidebar-nav-item.component";
import "./sidebar.styles.scss";

const SidebarComponent = () => {
  return (
    <Nav className="flex-column sidebar">
      <input
        type="text"
        placeholder="Search"
      />
      <IndexLinkContainer to="/" activeClassName="activeLink">
        <NavItem>{"Dashboard"}</NavItem>
      </IndexLinkContainer>
      <NavLink url="ABL/" textContent="ABL" />

      <NavLink url="Architect/" textContent="Architect" />
      <NavLink url="Cobas8000/" textContent="Cobas 8000" />
      <NavLink url="Cobas8100/" textContent="Cobas 8100" />
      <NavLink url="ManualUsedTransaction/" textContent="Manual Transaction" />
    </Nav>
  );
};

export default SidebarComponent;
