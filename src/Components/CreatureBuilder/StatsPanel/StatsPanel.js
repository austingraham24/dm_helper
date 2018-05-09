import React, {Component} from 'react';
import "../style.css";
import {Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix} from "react-bootstrap";
import UtilityPanel from "../../UtilityPanel";
import StatCalculationFunctions from "./StatCalculationFunctions.js";
import StatGroup from "./StatGroup.js";
import ProficiencyList from "./ProficiencyList.js";
import PropTypes from 'prop-types';
import _ from "lodash";

//component rendered in the CreatureBuilder form showing stats and proficiencies
class StatsPanel extends Component {
	constructor(props) {
		super(props);
		this.debounceUpdateParent = _.debounce(this.updateParent.bind(this),500);
		this.debounceUpdateStatMod = _.debounce(this.updateStatMod.bind(this), 250);

		this.state = StatCalculationFunctions.defaultStatState;
	}

	//called when user inputs values for stats
	//params: event
	//sets state, calls debounced method to update the stat mod
	onChange(event) {
		let name = event.target.name
		let value = event.target.value
		let newStatState = this.state[name];
		newStatState.value = value;
		this.setState({...this.state, [name]: newStatState});
		this.debounceUpdateStatMod(name,value);
	}

	//pass the stat and proficiency state to the index of the form
	updateParent(){
		let stats = {};
		Object.keys(this.state).map((key) => {
			if (key === "statProficiencies") {
				return
			}
			stats[key] = this.state[key];
		});
		let proficiencies = this.state.statProficiencies;
		let dataObject = {"stats":stats, "proficiencies":proficiencies}
		//console.log(dataObject);
	}

	//called when user enables or disables proficiencies under stats
	updateProficiencies(event) {
		let array = event.target.name.split("-");
		let stat = array[0];
		let skill = array[1];
		let stateStatProfs = this.state.statProficiencies;
		stateStatProfs[stat][skill] = event.target.checked;
		this.setState({...this.state, statProficiencies: stateStatProfs})
	}

	//calculates and updates state with the modifier (ex: +3) for stats based on value
	updateStatMod(statName, statValue){
		let mod = StatCalculationFunctions.calcStatMod(statValue);
		let newStatState = this.state[statName];
		newStatState.mod = mod;
		this.setState({...this.state, [statName]: newStatState});
		this.debounceUpdateParent();
	}

	//generates a statgroup component for each stat ("Strength", "Wsidom")
	//each group has the stat value field and sub-component for proficiencies
	statGroups() {
		return StatCalculationFunctions.statKeys.map((key) => {
			return <StatGroup key={key} statName={key} statObject={this.state[key]} statProficiencies={this.state.statProficiencies[key]} onChange={this.onChange.bind(this)} changeProfficiency={this.updateProficiencies.bind(this)} />
		});
	}

	render() {
		return (
			<Col xs={12}>
				<UtilityPanel 
					title="Stats & Proficiencies"
					collapsible>
					{this.statGroups()}
				</UtilityPanel>
			</Col>
		);
	}
}

export default StatsPanel;