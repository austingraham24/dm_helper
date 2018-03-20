import React, {Component} from 'react';
import "./style.css";
import DiceAverages from "../../Inf/DiceAverages.json";
import {Panel, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import SelectField from "../SelectField.js"
import HealthMod from "./HealthMod.js"
import PropTypes from 'prop-types';
import _ from "lodash";

class DefenseBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hp: 0,
			effectiveHP: 0,
			ac: 0,
			effectiveAC: 0,
			sizeData: null,
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

	calculateEffectiveHP(dataObject) {
		//the input could be empty string ("") so reset it back to base 0
		if (dataObject.hp === "") {
			dataObject["hp"] = 0;
		}
		let effectiveHP = dataObject.hp
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
		let hpCR = this.props.CRMethod("hp", dataObject.effectiveHP || 0);
		let acCR = this.props.CRMethod("ac", dataObject.effectiveAC || 0, hpCR);
		//console.log("HPCR:", hpCR, "ACCR:", acCR);
		if (hpCR === acCR) {
			finalCR = hpCR;
		}
		else {
			let hpIndex = this.props.crKeys.indexOf(hpCR.toString());
			let acIndex = this.props.crKeys.indexOf(acCR.toString());
			let difference = Math.abs(hpIndex - acIndex);
			//console.log(difference);
			if (difference == 1) {
				finalCR = eval(hpCR) > eval(acCR)? hpCR: acCR;
			}
			else {
				let averagedCRIndex = Math.ceil((hpIndex + acIndex)/2);
				let averagedCR = this.props.crKeys[averagedCRIndex];
				finalCR = averagedCR;
			}
		}
		return finalCR || 0;
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
		console.log(newDataObject);
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
									<ControlLabel>Immunities:</ControlLabel>
									<HealthMod />
									<ControlLabel>Resistances:</ControlLabel>
									<HealthMod />
									<ControlLabel>Vulnerabilities:</ControlLabel>
									<HealthMod />
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