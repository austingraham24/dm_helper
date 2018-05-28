import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import "./style.css";

const Footer =()=> {
	return (
		  <footer className="footer">
        <div className="container">
          <div>&copy; 2018 Austin Graham</div>
          <div className="disclaimer">Wizards of the Coast, Dungeons & Dragons, D&D, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 2017 Wizards. All Rights Reserved. This site is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.</div>
        </div>
      </footer>
	);
}

export default Footer;