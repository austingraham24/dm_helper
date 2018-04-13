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

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
			let currentState = this.state;
			this.props.handleChange(currentState);
		}
	}

	handleChange(event) {
		let fieldName = event.target.name
		let newValue = event.target.value
		let newDataObject = {...this.state}
		newDataObject[fieldName] = newValue;
		this.setState({...newDataObject});
		return
	}

	render() {
		return (
				<Col xs={12} md={7}>
	        	{/*Creature Offenses Panel*/}
	        	<FormGroup controlId="offenseBlock">
	        		<Panel>
	        			<Panel.Heading>Offense (CR: {this.props.offenseProps.offenseCR || 0})</Panel.Heading>
						<Panel.Body>
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