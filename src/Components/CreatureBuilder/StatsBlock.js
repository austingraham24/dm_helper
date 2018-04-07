import React, {Component} from 'react';
import "./style.css";
import {Panel, Label, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import TableTemplate from '../TableTemplate.js';
import PropTypes from 'prop-types';
import _ from "lodash";

class StatsBlock extends Component {
	constructor(props) {
		super(props);
		this.statKeys = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		this.statProficiencies = {"Strength": ["Athletics"], "Dexterity": ["Acrobatics"]};
		this.debounceChange = _.debounce(this.updateParent.bind(this),500);

		this.state = {
			Strength: null,
			Wisdom: null,
			Dexterity: null,
			Constitution: 10,
			Intelligence: null,
			Charisma: null
		};
	}

	updateParent(name, value){
		console.log("UpdateParent",name, value);
		
	}

	onChange(event) {
		let name = event.target.name
		let value = event.target.value
		this.setState({...this.state, [name]: value});
		this.debounceChange(name, value);
	}


	statPanels() {
		return this.statKeys.map((key) => {
			console.log(key);
			console.log(this.state[key]);
			return (
				<Col xs={4} sm={2} key={key} className="form-col">
					<ControlLabel>{key}:</ControlLabel>
					<FormControl
				        type="text"
				        name = {key}
				        value={this.state[key] || ""}
				        onChange = {this.onChange.bind(this)}
			        />
				</Col>
			);
		});
	}

	render() {
		return (
			<Col xs={12}>
				<Panel>
				<Panel.Heading>
				Stats & Proficiencies
				</Panel.Heading>
				<Panel.Body>
				{this.statPanels()}
				</Panel.Body>
				</Panel>
			</Col>
		);
	}
}

export default StatsBlock;