import React from 'react';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const Landing  = () => {
	return(
		<div className="container">
		<LinkContainer to="/CreatureBuilder">
			<Button bsStyle="primary">Build-A-Creature!</Button>
		</LinkContainer>
		</div>
	);
};

export default Landing;