import React from 'react';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const Landing  = () => {
	return(
		<div>
		<Link to="/CreatureBuilder">
			Create!
		</Link>
		<br />
		<LinkContainer to="/CreatureBuilder">
			<Button bsStyle="primary">Primary</Button>
		</LinkContainer>
		</div>
	);
};

export default Landing;