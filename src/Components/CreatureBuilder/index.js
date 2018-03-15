import React, {Component} from 'react';
import "./style.css";
import jsonData from "../../Inf/CreatureStatChart.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Button, FormGroup, FormControl, HelpBlock, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import SelectField from "../SelectField.js"
import PropTypes from 'prop-types';

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);
		let alignments = {"none":"Unaligned", "lg":"Lawful Good", "ng":"Neutral Good", "cg":"Chaotic Good", "ln":"Lawful Neutral", "n":"Neutral", "cn":"Chaotic Neutral", "le":"Lawful Evil", "ne":"Neutral Evil", "ce":"Chaotic Evil"}

		this.state = {
			templateCR: null,
			type:"",
			name:"",
			alignments: alignments
		};
	};

	setSelectedCrTemplate(event) {
		let value = event.target.value || null
		this.setState({templateCR: value});
	}

	getCRData() {
		return this.state.templateCR ? jsonData[this.state.templateCR] : null
	}

	handleChange(event) {
		let newDataObject={}
		newDataObject[event.target.name] = event.target.value;
		this.setState({...newDataObject});
	}

	render() {
		return (
		  <div className="container">
		  	<PageHeader>Creature Builder</PageHeader>
		  	<form>
		  		<Row className="formRow">
			  	<FormGroup controlId="templateOptions">
				  	<Col md={12}>
			        	<ControlLabel>View Quick Stats for CR:</ControlLabel>
			        	<TemplateSelect currentValue={this.state.templateCR} Options={Object.keys(jsonData).sort()} callback={this.setSelectedCrTemplate.bind(this)} />
				      	<ReferenceStatTable CR={this.state.templateCR} crData={this.getCRData()} />
				     </Col>
		      	</FormGroup>
		      	</Row>
		      	<Row className="formRow">
		      	<FormGroup controlId="creatureCore">
		      		<Col xs={6} md={3}>
		      		<ControlLabel>Current Challenge Rating:</ControlLabel>
				    <div>{this.state.challengeRating || 0}</div>
				    </Col>
		      		<Col xs={6} md={3}>
		      		<ControlLabel>Experience Awarded:</ControlLabel>
				    <div>{this.state.experience || 0}</div>
				    </Col>
		      	</FormGroup>
		      	</Row>
		      	<Row className="formRow">
		      	<FormGroup controlId="creatureIdentifiers">
			      	<Col xs={6} md={4}>
				      <ControlLabel>Creature Type:</ControlLabel>
			        	<FormControl
				            type="text"
				            name = "type"
				            value={this.state.type}
				            placeholder="Creature Type (e.g. Wraith)"
				            onChange={this.handleChange.bind(this)}
				          />
					</Col>
					<Col xs={6} md={4}>
				      <ControlLabel>Creature Name: <span className="form-help">(Optional)</span></ControlLabel>
			        	<FormControl
				            type="text"
				            name = "name"
				            value={this.state.name}
				            placeholder="Creature's Name"
				            onChange={this.handleChange.bind(this)}
				          />
					</Col>
	        	</FormGroup>
	        	</Row>
	        	<Row className="formRow">
	        	<FormGroup controlId="creatureIdentifiers">
			      	<Col xs={4} md={2}>
				      <ControlLabel>Classification:</ControlLabel>
				      <SelectField arrayData={CreatureClassificationArray} onChange={this.handleChange.bind(this)} stateValue={this.state.classification} />
					</Col>
					<Col xs={4} md={2}>
				      <ControlLabel>Alignment:</ControlLabel>
			        	<SelectField  objectData={this.state.alignments} onChange={this.handleChange.bind(this)} stateValue={this.state.alignment}/>
					</Col>
					<Col xs={4} md={2}>
				      <ControlLabel>Size:</ControlLabel>
			        	<FormControl
				            componentClass="select"
				            name = "size"
				            value={this.state.size || ""}
				            placeholder=""
				            onChange={this.handleChange.bind(this)}
				          >
				          	<option value="" hidden>Select Size</option>
				          	<option value="tiny">Tiny</option>
				          	<option value="small">Small</option>
				          	<option value="medium">Medium</option>
				          	<option value="large">Large</option>
				          	<option value="huge">Huge</option>
				          	<option value="gargantuan">Gargantuan</option>
				          </FormControl>
					</Col>
	        	</FormGroup>
	        	</Row>
		  	</form>
		  </div>
		);
	}
}

export default CreatureBuilder;