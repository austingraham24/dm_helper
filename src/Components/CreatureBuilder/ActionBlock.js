import React, {Component} from "react";
import {Panel, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import CalculationFunctions from "./CalculationFunctions";

class ActionBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offensiveCR: 0,
			saveDC: 0,
			attackBonus: 0,
			dpr: 0
		};
	};

	handleChange(event) {
		let fieldName = event.target.name
		let newValue = event.target.value
		let newDataObject = {...this.state}
		newDataObject[fieldName] = newValue;
		newDataObject["offensiveCR"] = CalculationFunctions.calculateCR(fieldName,newValue);
		this.setState({...newDataObject});
		return
	}

	render() {
		return (
				<Col xs={12}>
	        	{/*Creature Offenses Panel*/}
	        	<FormGroup controlId="actions">
	        		<Panel>
	        			<Panel.Heading>Actions</Panel.Heading>
						<Panel.Body>
							Actions
						</Panel.Body>
					</Panel>
					</FormGroup>
	        	</Col>
		);
	}
}

export default ActionBlock;