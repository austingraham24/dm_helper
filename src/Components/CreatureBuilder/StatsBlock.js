import React, {Component} from 'react';
import "./style.css";
import {Panel, Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix, Glyphicon} from "react-bootstrap";
import TableTemplate from '../TableTemplate.js';
import PropTypes from 'prop-types';
import _ from "lodash";

class StatsBlock extends Component {
	constructor(props) {
		super(props);
		this.statKeys = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		this.debounceChange = _.debounce(this.updateParent.bind(this),500);

		this.state = {
			panelOpen: true,
			panelGlyph: "minus",
			Strength: null,
			Wisdom: null,
			Dexterity: null,
			Constitution: null,
			Intelligence: null,
			Charisma: null,
			statProficiencies: {"Strength": {"Saving Throw":false, "Athletics":false}, "Dexterity": {"Saving Throw":false, "Acrobatics":false, "Slight of Hand":false, "Stealth":false}, "Constitution": {"Saving Throw":false}, "Intelligence": {"Saving Throw":false, "Arcana":false, "History":false, "Investigation":false, "Investigation":false, "Nature":false, "Religion":false}, "Wisdom": {"Saving Throw":false, "Animal Handling": false, "Insight":false, "Medicine":false, "Perception":false, "Survival":false}, "Charisma": {"Saving Throw":false, "Deception":false, "Intimidation":false, "Performance":false, "Persuasion":false}}
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

	updateProficiencies(event) {
		let array = event.target.name.split("-");
		let stat = array[0];
		let skill = array[1];
		let stateStatProfs = this.state.statProficiencies;
		stateStatProfs[stat][skill] = event.target.checked;
		this.setState({...this.state, statProficiencies: stateStatProfs})

	}

	listProficiencies(statName) {
		let statProficiencies = this.state.statProficiencies[statName];
		return Object.keys(statProficiencies).map((key) => {
			let isActive = statProficiencies[key];
			return  <Checkbox checked={isActive} name={statName+"-"+key} key={key} onChange={this.updateProficiencies.bind(this)} bsClass="checkbox profCheckBox">{key}</Checkbox>
		});
	}

	togglePanel() {
		let open = true;
		let glyph = "minus";
		if (this.state.panelOpen) {
			open = false;
			glyph = "plus";
		}
		this.setState({panelOpen: open, panelGlyph: glyph});
	}

	statPanels() {
		return this.statKeys.map((key) => {
			return (
				<Col xs={4} sm={2} key={key} className="form-col">
					<ControlLabel>{key}:</ControlLabel>
					<FormControl
				        type="text"
				        name = {key}
				        value={this.state[key] || ""}
				        onChange = {this.onChange.bind(this)}
			        />
			        <FormGroup>
			        <div className="profLabel"><strong>Proficiencies:</strong></div>
				      {this.listProficiencies(key)}
				    </FormGroup>
				</Col>
			);
		});
	}

	render() {
		return (
			<Col xs={12}>
				<Panel expanded={this.state.panelOpen} onToggle={this.togglePanel.bind(this)}>
					<Panel.Heading>
						Stats & Proficiencies
						<Panel.Toggle componentClass="a" className="panel-toggle btn btn-default btn-xs"><Glyphicon glyph={this.state.panelGlyph} /></Panel.Toggle>
					</Panel.Heading>
					<Panel.Collapse>
						<Panel.Body>
							{this.statPanels()}
						</Panel.Body>
					</Panel.Collapse>
				</Panel>
			</Col>
		);
	}
}

export default StatsBlock;