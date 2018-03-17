import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";

class HealthMod extends Component {
	constructor(props) {
		super(props);
		let damageTypes = ["Fire","Thunder","Radiant","Poison","Slashing","Piercing","Bludgeoning","Lightning", "Psychic", "Necrotic", "Cold", "Acid"]
		//let sizes = {"tiny":"Tiny", "small": "Small", "medium": "Medium", "large":"Large", "huge":"Huge", "gargantuan":"Gargantuan"}
		this.state = {damageTypes};
	};

	render() {
		return (
			<div>Test</div>
		);
	}
}

export default HealthMod;