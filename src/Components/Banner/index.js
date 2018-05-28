import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import "./banner.css"

const Banner =()=> {
	return (
		  <Navbar inverse staticTop collapseOnSelect>
			  <Navbar.Header>
			  <LinkContainer to="/">
				    <Navbar.Brand className="brand">
				      D&D Dungeon Master Helper
				    </Navbar.Brand>
			    </LinkContainer>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav>
			      <NavItem eventKey={1} href="#/test" disabled>
			        Campaign Manager
			      </NavItem>
			      <LinkContainer to="/CreatureBuilder">
				      <NavItem eventKey={2} href="#">
				        Creature Builder
				      </NavItem>
			      </LinkContainer>
			    </Nav>
			    <Nav pullRight>
			      <NavItem eventKey={1} href="#" disabled>
			        Sign In
			      </NavItem>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
	);
}

export default Banner;