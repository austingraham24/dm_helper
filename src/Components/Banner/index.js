import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import "./banner.css"

const Banner =()=> {
	return (
	  <Navbar inverse staticTop collapseOnSelect>
		  <Navbar.Header>
		    <Navbar.Brand>
		      <a href="#brand">D&D Dungeon Master Helper</a>
		    </Navbar.Brand>
		    <Navbar.Toggle />
		  </Navbar.Header>
		  <Navbar.Collapse>
		    <Nav>
		      <NavItem eventKey={1} href="#">
		        Campaign Manager
		      </NavItem>
		      <NavItem eventKey={2} href="#">
		        Creature Builder
		      </NavItem>
		    </Nav>
		    <Nav pullRight>
		      <NavItem eventKey={1} href="#">
		        Sign In
		      </NavItem>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
	);
}

export default Banner;