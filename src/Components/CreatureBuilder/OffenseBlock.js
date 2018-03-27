import React, {Component} from "react";
import {Panel, FormGroup, FormControl, ControlLabel, Col} from "react-bootstrap";
import ActionBlock from "./ActionBlock";
import CalculationFunctions from "./CalculationFunctions";

class OffenseBlock extends Component {
	constructor(props) {
		super(props);
		console.log(CalculationFunctions.calculateCR("hp",100));
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