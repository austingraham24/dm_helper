import React, {Component} from "react";
import {Panel, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import ActionBlock from "./ActionBlock";
import CalculationFunctions from "./CalculationFunctions";

class OffenseBlock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offensiveCR: 0,
			saveDC: 0,
			attackBonus: 0,
			dpr: 0
		};
	};

	getAverageOffensiveCR(dataObject) {
		//calculate the Challenge Ratings for each field
		let saveCR = CalculationFunctions.calculateCR("saveDC", dataObject.saveDC);
		let attackCR = CalculationFunctions.calculateCR("attackBonus", dataObject.attackBonus);
		let damageCR = CalculationFunctions.calculateCR("dpr", dataObject.dpr);
		//get the index for that CR; this is because the average of 2 and 1/8 isn't a real CR, but by using indexes we can get the proper CR
		let saveIndex = CalculationFunctions.crKeys.indexOf(saveCR.toString());
		let attackIndex = CalculationFunctions.crKeys.indexOf(attackCR.toString());
		let damageIndex = CalculationFunctions.crKeys.indexOf(damageCR.toString());

		let averagedCRIndex = Math.ceil((saveIndex + attackIndex + damageIndex)/3);
		let averagedCR = CalculationFunctions.crKeys[averagedCRIndex];
		return averagedCR;
	}

	handleChange(event) {
		let fieldName = event.target.name
		let newValue = event.target.value
		let newDataObject = {...this.state}
		newDataObject[fieldName] = newValue;
		newDataObject["offensiveCR"] = this.getAverageOffensiveCR(newDataObject)
		this.setState({...newDataObject});
		return
	}

	render() {
		return (
				<Col xs={12} md={7}>
	        	{/*Creature Offenses Panel*/}
	        	<FormGroup controlId="offenseBlock">
	        		<Panel>
	        			<Panel.Heading>Offense Block</Panel.Heading>
						<Panel.Body>
							<Col xs={12} className="form-col">
								<ControlLabel>Offensive CR: {this.state.offensiveCR || 0}</ControlLabel>
							</Col>
							<Col xs={12} md={4} className="form-col">
											<ControlLabel>Attack Bonus: <span className="form-help">(Number only)</span></ControlLabel>
											<FormControl
												type="text"
												name = "attackBonus"
												value={this.state.attackBonus || ""}
												onChange={this.handleChange.bind(this)}
											/>
										</Col>
							<Col xs={12} md={4} className="form-col">
							<ControlLabel>Save DC:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "saveDC"
					            value={this.state.saveDC || ""}
					            onChange={this.handleChange.bind(this)}
					          />
					    </Col>
					    <Col xs={12} md={4} className="form-col">
							<ControlLabel>Damage Per Round:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "dpr"
					            value={this.state.dpr || ""}
					            onChange={this.handleChange.bind(this)}
					          />
					    </Col>
					    <ActionBlock />
						</Panel.Body>
					</Panel>
					</FormGroup>
	        	</Col>
		);
	}
}

export default OffenseBlock;