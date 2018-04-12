import React, {Component} from 'react';
import "./style.css";
import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import StatBlock from "./StatsBlock";
import SelectField from "../SelectField.js"
import DefenseBlock from "./DefenseBlock.js";
import OffenseBlock from "./OffenseBlock.js";
import CalculationFunctions from "./CalculationFunctions";
import PropTypes from 'prop-types';

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);
		this.alignments = {"none":"Unaligned", "lg":"Lawful Good", "ng":"Neutral Good", "cg":"Chaotic Good", "ln":"Lawful Neutral", "n":"Neutral", "cn":"Chaotic Neutral", "le":"Lawful Evil", "ne":"Neutral Evil", "ce":"Chaotic Evil"}
		this.state = {
			//form specific state vars
			templateCR: null,
			allowFieldOverrides: false,
			//creature specific state vars
			type:"",
			name:"",
			size: null,
			classification: null,
			alignment: "none",
			experience: null,
			proficiencyBonus: 0,
			challengeRating: null,
			defenses: null,
			offenses: null,
			stats: null,
			languages: null,
			proficiencies: null
		};
	};

	setSelectedCrTemplate(event) {
		let value = event.target.value || null
		this.setState({templateCR: value});
	}

	handleChange(event) {
		let newDataObject={}
		newDataObject[event.target.name] = event.target.value;
		if (!this.state.allowFieldOverrides) {
			//this.setState({challengeRating: hpCR})
		}
		this.setState({...newDataObject});
		//console.log(this.calculateCR(event.target.name, event.target.value));
	}

	updateDefensiveData(newDataObject) {
		let newDefenseState = {defenseBlock: newDataObject}
		this.setState({...newDefenseState});
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
			        	<TemplateSelect currentValue={this.state.templateCR} Options={CalculationFunctions.crKeys} callback={this.setSelectedCrTemplate.bind(this)} />
				      	<ReferenceStatTable CR={this.state.templateCR} crData={CreatureStats[this.state.templateCR] || null} />
				    </Col>
		      	</FormGroup>
		      </Row>
		      	{/*Creature Overview Panel*/}
		      	<Panel>
        			<Panel.Heading>Creature Overview</Panel.Heading>
					<Panel.Body>
						<Col sm={12} md={5} className="form-col">
					      	<FormGroup controlId="creatureIdentifiers">
						      	<Col xs={12} className="form-col">
							      <ControlLabel>Creature Type:</ControlLabel>
						        	<FormControl
							            type="text"
							            name = "type"
							            value={this.state.type}
							            placeholder="Creature Type (e.g. Skeleton)"
							            onChange={this.handleChange.bind(this)}
							          />
								</Col>
								<Col xs={12} className="form-col">
							      <ControlLabel>Creature Name: <span className="form-help">(Optional)</span></ControlLabel>
						        	<FormControl
							            type="text"
							            name = "name"
							            value={this.state.name}
							            placeholder="Creature's Name (e.g. Yorick)"
							            onChange={this.handleChange.bind(this)}
							          />
								</Col>
				        	</FormGroup>
			        	</Col>
			        	<Col sm={12} md={7} className="form-col">
			        	<FormGroup controlId="creatureIdentifiers">
					      	<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Classification:</ControlLabel>
						      <SelectField name="classification" arrayData={CreatureClassificationArray} onChange={this.handleChange.bind(this)} stateValue={this.state.classification} placeholder="Unknown" />
							</Col>
							<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Alignment:</ControlLabel>
					        	<SelectField name="alignment" objectData={this.alignments} onChange={this.handleChange.bind(this)} stateValue={this.state.alignment}/>
							</Col>
							<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Size:</ControlLabel>
						      <SelectField name="size" arrayData={Object.keys(creatureSizes)} placeholder="Select Size" onChange={this.handleChange.bind(this)} stateValue={this.state.size}/>
							</Col>
			        	</FormGroup>
				        	<FormGroup controlId="creatureCore">
					      		<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>Challenge Rating (CR):</ControlLabel>
							    	<div>{this.state.challengeRating || 0}</div>
							    </Col>
							    <Clearfix visibleXsBlock visibleSmBlock />
					      		<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>XP Awarded:</ControlLabel>
							    	<div>{this.state.experience || 0}</div>
						    	</Col>
						    	<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>Proficiency Bonus:</ControlLabel>
							    	<div>+{this.state.proficiencyBonus || 0}</div>
						    	</Col>
			      			</FormGroup>
			        	</Col>
					</Panel.Body>
				</Panel>
				<Row className="formRow">
					<StatBlock />
				</Row>
		      	{/*Creature Defenses Panel*/}
	        	<Row className="formRow">
	        	<DefenseBlock handleChange={this.updateDefensiveData.bind(this)} hitDice={creatureSizes[this.state.size] || null} />
	        	<OffenseBlock />
	        	</Row>
		  	</form>
		  </div>
		);
	}
}

export default CreatureBuilder;