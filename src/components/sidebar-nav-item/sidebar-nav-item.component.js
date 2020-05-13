import React from "react";
import { NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const SidebarNavItemComponent = ({ url, textContent }) => {
  return (
    <LinkContainer to={`/${url}`} activeClassName="activeLink">
      <NavItem>{textContent}</NavItem>
    </LinkContainer>
  );
};

export default SidebarNavItemComponent;
