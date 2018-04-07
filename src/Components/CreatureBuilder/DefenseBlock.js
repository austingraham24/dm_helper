import React, {Component} from 'react';
import "./style.css";
import {Panel, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import HealthMod from "./HealthMod/HealthMod.js"
import PropTypes from 'prop-types';
import CalculationFunctions from "./CalculationFunctions";
import _ from "lodash";

class DefenseBlock extends Component {
	constructor(props) {
		super(props);

		this.modifierMultipliers = [{lowerBoundCR: 17, resistance: 1, immunity: 1.25}, {lowerBoundCR: 11, resistance: 1.25, immunity: 1.5}, {lowerBoundCR: 5, resistance: 1.5, immunity: 2}, {lowerBoundCR: 0, resistance: 2, immunity: 2}];
		this.state = {
			hp: 0,
			effectiveHP: 0,
			ac: 0,
			effectiveAC: 0,
			defensiveCR: 0,
			immunities: [],
			resistances: [],
			vulnerabilities: []
		};
	};

	componentWillMount() {
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
			let currentState = this.state;
			this.props.handleChange(currentState);
		}
	}

	getExceptionMods(exceptionKey) {
		let mods = [];
		let keys = ["immunities", "resistances", "vulnerabilities"];
		for (var index in keys) {
			if (keys[index] != exceptionKey) {
				mods = mods.concat(this.state[keys[index]]);
			}
		}
		return mods;
	}

	calculateEffectiveHP(dataObject) {
		//the input could be empty string ("") so reset it back to base 0
		if (dataObject.hp === "") {
			dataObject["hp"] = 0;
		}
		let baseHPCR = CalculationFunctions.calculateCR("ac", dataObject.hp);
		let effectiveHP = dataObject.hp
		let immunitiesCount = dataObject.immunities.length;
		let resistancesCount = dataObject.resistances.length;
		if (immunitiesCount + resistancesCount > 2) {
			let multiplier = 1
			let key;
			if (resistancesCount > immunitiesCount) {
				key="resistance";
			}
			else {
				key="immunity";
			}
			for (var index in this.modifierMultipliers) {
				if (baseHPCR >= this.modifierMultipliers[index].lowerBoundCR) {
					multiplier = this.modifierMultipliers[index][key];
					break;
				}
			}
			effectiveHP = Math.ceil(effectiveHP * multiplier);
		}
		let updatedDataObject = {...dataObject}
		updatedDataObject["effectiveHP"] = effectiveHP;
		return updatedDataObject
	}

	calculateEffectiveAC(dataObject) {
		//the input could be empty string ("") so reset it back to base 0
		if (dataObject.ac === "") {
			dataObject["ac"] = 0;
		}
		let effectiveAC = dataObject.ac
		let updatedDataObject = {...dataObject}
		updatedDataObject["effectiveAC"] = effectiveAC;
		return updatedDataObject
	}

	calculateDefensiveCR(dataObject) {
		let finalCR;
		let hpCR = CalculationFunctions.calculateCR("hp", dataObject.effectiveHP || 0);
		let acCR = CalculationFunctions.calculateCR("ac", dataObject.effectiveAC || 0, hpCR);
		//console.log("HPCR:", hpCR, "ACCR:", acCR);
		if (hpCR === acCR) {
			finalCR = hpCR;
		}
		else {
			let hpIndex = CalculationFunctions.crKeys.indexOf(hpCR.toString());
			let acIndex = CalculationFunctions.crKeys.indexOf(acCR.toString());
			let difference = Math.abs(hpIndex - acIndex);
			//console.log(difference);
			if (difference == 1) {
				finalCR=hpCR; //finalCR = eval(hpCR) > eval(acCR)? hpCR: acCR;
			}
			else {
				let averagedCRIndex = Math.floor((hpIndex + acIndex)/2);
				let averagedCR = CalculationFunctions.crKeys[averagedCRIndex];
				finalCR = averagedCR;
			}
		}
		return finalCR || 0;
	}

	updateDamageMod(name, values) {
		let dataObject = {...this.state, [name]:values};
		console.log(dataObject);
		dataObject = this.calculateEffectiveHP(dataObject);
		this.setState({...dataObject})
	}

	handleChange(event) {
		let fieldName = event.target.name
		let newValue = event.target.value
		let newDataObject = {...this.state}
		newDataObject[fieldName] = newValue;
		newDataObject = this.calculateEffectiveHP(newDataObject);
		newDataObject = this.calculateEffectiveAC(newDataObject);
		let calculatedCR = this.calculateDefensiveCR(newDataObject);
		newDataObject["defensiveCR"] = calculatedCR;
		this.setState({...newDataObject});
		return
	}

	getHitDice() {
		if (!this.props.hitDice) {
			return null;
		}

		return (
			<span className="form-help">(Hit Dice: {this.props.hitDice})</span>
		);
	}

	render() {
		return (
			<Col xs={12} md={5}>
	        	<FormGroup controlId="deffenseBlock">
	        		<Panel>
	        			<Panel.Heading>Defense Block</Panel.Heading>
						<Panel.Body>
							<Col xs={12} className="form-col">
							<ControlLabel>Defensive CR: {this.state.defensiveCR || 0}</ControlLabel>
							</Col>
							<Col xs={12} sm={6} className="form-col">
								<ControlLabel>Health Points: {this.getHitDice()}</ControlLabel>
								<FormControl
									type="text"
									name = "hp"
									value={this.state.hp || ""}
									placeholder="It's dead Jim."
									onChange={this.handleChange.bind(this)}
								/>
							</Col>
							<Col xs={12} sm={6} className="form-col">
							<ControlLabel>Armor Class:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "ac"
					            value={this.state.ac || ""}
					            placeholder="#GlassCannon"
					            onChange={this.handleChange.bind(this)}
					          />
					        </Col>
					        <Col xs={12} sm={6} className="form-col">
							<ControlLabel>Effective Health Points:</ControlLabel>
				        	<div>{this.state.effectiveHP || 0}</div>
					        </Col>
					        <Col xs={12} sm={6} className="form-col">
							<ControlLabel>Effective Armor Class:</ControlLabel>
				        	<div>{this.state.effectiveAC || 0}</div>
					        </Col>
					        <Col xs={12} className="form-col">
					    	<Panel>
					    		<Panel.Heading>Damage Modifiers</Panel.Heading>
								<Panel.Body>
									<HealthMod name="Immunities" prefill={this.state.immunities} updateMods={this.updateDamageMod.bind(this)} exceptionMods={this.getExceptionMods("immunities")}/>
									<HealthMod name="Resistances" prefill={this.state.resistances} updateMods={this.updateDamageMod.bind(this)} exceptionMods={this.getExceptionMods("resistances")} />
									<HealthMod name="Vulnerabilities" prefill={this.state.vulnerabilities} updateMods={this.updateDamageMod.bind(this)} exceptionMods={this.getExceptionMods("vulnerabilities")} />
								</Panel.Body>
							</Panel>
					    </Col>
						</Panel.Body>
					</Panel>
	        	</FormGroup>
	        	</Col>
		);
	}
}

DefenseBlock.propTypes = {
	/*REQUIRED*/
  damageTypes: PropTypes.arrayOf(PropTypes.string).isRequired, // list of valid damage types
  handleChange: PropTypes.func.isRequired, //the method to call when the component's state has changed

  /*Optional*/
  hitDice: PropTypes.string //the hit dice to use
}

export default DefenseBlock;