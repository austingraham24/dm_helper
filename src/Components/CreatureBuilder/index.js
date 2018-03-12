import React, {Component} from 'react';
//import { Nav, Navbar, NavItem} from 'react-bootstrap';
import "./style.css"

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sample: null
		};
	};

	render() {
	return (
	  <div className="container">
	  	<form>
	  		<label>
	  			Expected Challenge Rating:
	  		</label><br/>
	  		<label>
	  			Name:
	  		</label>
	  	</form>
	  </div>
	);
	}
}

export default CreatureBuilder;