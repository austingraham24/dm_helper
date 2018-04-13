import React, {Component} from 'react';
import "./style.css";
import {Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix} from "react-bootstrap";
import TableTemplate from '../TableTemplate.js';
import statsMods from "../../Inf/StatMods.json";
import PanelButtonToggle from "../PanelButtonToggle/PanelButtonToggle.js";
import PropTypes from 'prop-types';
import _ from "lodash";

class StatsBlock extends Component {
	constructor(props) {
		super(props);
		this.statKeys = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
		this.debounceChange = _.debounce(this.updateParent.bind(this),500);

		this.state = {
			Strength: {"value":null,"mod":null},
			Wisdom: {"value":null,"mod":null},
			Dexterity: {"value":null,"mod":null},
			Constitution: {"value":null,"mod":null},
			Intelligence: {"value":null,"mod":null},
			Charisma: {"value":null,"mod":null},
			statProficiencies: {"Strength": {"Saving Throw":false, "Athletics":false}, "Dexterity": {"Saving Throw":false, "Acrobatics":false, "Slight of Hand":false, "Stealth":false}, "Constitution": {"Saving Throw":false}, "Intelligence": {"Saving Throw":false, "Arcana":false, "History":false, "Investigation":false, "Investigation":false, "Nature":false, "Religion":false}, "Wisdom": {"Saving Throw":false, "Animal Handling": false, "Insight":false, "Medicine":false, "Perception":false, "Survival":false}, "Charisma": {"Saving Throw":false, "Deception":false, "Intimidation":false, "Performance":false, "Persuasion":false}}
		};
	}

	updateParent(name, value){
		console.log("UpdateParent",name, value);
		
	}

	calcStatMod(value){
		var mod = 0;
		for (var index in statsMods) {
			if (value <= statsMods[index].score) {
				mod = statsMods[index].mod;
				break;
			}
		}
		return mod;
	}

	onChange(event) {
		let name = event.target.name
		let value = event.target.value
		let mod = this.calcStatMod(value);
		this.setState({...this.state, [name]: {"value":value, "mod":mod}});
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

	getModForStat(key) {
		if (!this.state[key].mod && this.state[key].mod != 0) {
			return null;
		}
		let mod = this.state[key].mod;
		return mod > 0 ? "+"+mod : mod;
	}

	statPanels() {
		return this.statKeys.map((key) => {
			return (
				<Col xs={4} sm={2} key={key} className="form-col">
					<ControlLabel>{key}: {this.getModForStat(key)}</ControlLabel>
					<FormControl
				        type="text"
				        name = {key}
				        value={this.state[key].value || ""}
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
				<PanelButtonToggle title="Stats & Proficiencies" defaultOpened>
					{this.statPanels()}
				</PanelButtonToggle>
			</Col>
		);
	}
}

export default StatsBlock;