import React, {Component} from 'react';
import "./style.css";
import jsonData from "../../Inf/CreatureStatChart.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import SelectField from "../SelectField.js"
import HealthMod from "./HealthMod.js"
import PropTypes from 'prop-types';

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);
		let alignments = {"none":"Unaligned", "lg":"Lawful Good", "ng":"Neutral Good", "cg":"Chaotic Good", "ln":"Lawful Neutral", "n":"Neutral", "cn":"Chaotic Neutral", "le":"Lawful Evil", "ne":"Neutral Evil", "ce":"Chaotic Evil"}
		let sizes = {"tiny":"Tiny", "small": "Small", "medium": "Medium", "large":"Large", "huge":"Huge", "gargantuan":"Gargantuan"}
		this.state = {
			templateCR: null,
			type:"",
			name:"",
			sizes:sizes,
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
						            placeholder="Creature Type (e.g. Wraith)"
						            onChange={this.handleChange.bind(this)}
						          />
							</Col>
							<Col xs={12} className="form-col">
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
			        	</Col>
			        	<Col sm={12} md={7} className="form-col">
			        	<FormGroup controlId="creatureIdentifiers">
					      	<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Classification:</ControlLabel>
						      <SelectField name="classification" arrayData={CreatureClassificationArray} onChange={this.handleChange.bind(this)} stateValue={this.state.classification} placeholder="Unknown" />
							</Col>
							<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Alignment:</ControlLabel>
					        	<SelectField name="alignment" objectData={this.state.alignments} onChange={this.handleChange.bind(this)} stateValue={this.state.alignment}/>
							</Col>
							<Col xs={6} md={4} className="form-col">
						      <ControlLabel>Size:</ControlLabel>
						      <SelectField name="size" objectData={this.state.sizes} placeholder="Select Size" onChange={this.handleChange.bind(this)} stateValue={this.state.size}/>
							</Col>
			        	</FormGroup>
				        	<FormGroup controlId="creatureCore">
					      		<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>Challenge Rating:</ControlLabel>
							    	<div>{this.state.challengeRating || 0}</div>
							    </Col>
							    <Clearfix visibleXsBlock visibleSmBlock />
					      		<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>XP Awarded:</ControlLabel>
							    	<div>{this.state.experience || 0}</div>
						    	</Col>
						    	<Col xs={6} md={4} className="form-col">
					      			<ControlLabel>Proficiency Bonus:</ControlLabel>
							    	<div>+{this.state.profficiency || 0}</div>
						    	</Col>
			      			</FormGroup>
			        	</Col>
					</Panel.Body>
				</Panel>
		      	
	        	<Row className="formRow">
	        	<Col xs={12} md={5}>
	        	<FormGroup controlId="deffenseBlock">
	        		<Panel>
	        			<Panel.Heading>Defense Block</Panel.Heading>
						<Panel.Body>
							<Col xs={12} className="form-col">
							<div>Deffensive CR: 0</div>
							</Col>
							<Col xs={12} md={6} className="form-col">
											<ControlLabel>Health Points:</ControlLabel>
											<FormControl
												type="text"
												name = "hp"
												value={this.state.hp || 0}
												placeholder="Health Points"
												onChange={this.handleChange.bind(this)}
											/>
										</Col>
							<Col xs={12} md={6} className="form-col">
							<ControlLabel>Armor Class:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "ac"
					            value={this.state.ac || 0}
					            placeholder="Armor Class"
					            onChange={this.handleChange.bind(this)}
					          />
					          </Col>
						</Panel.Body>
					</Panel>
	        	</FormGroup>
	        	</Col>
	        	<Col xs={12} md={7}>
	        	<FormGroup controlId="offenseBlock">
	        		<Panel>
	        			<Panel.Heading>Offense Block</Panel.Heading>
						<Panel.Body>
							<Col xs={12} className="form-col">
								<div>Offensive CR: 0</div>
							</Col>
							<Col xs={12} md={4} className="form-col">
											<ControlLabel>Attack Bonus: <span className="form-help">(Number only)</span></ControlLabel>
											<FormControl
												type="text"
												name = "attackBonus"
												value={this.state.attackBonus || 0}
												onChange={this.handleChange.bind(this)}
											/>
										</Col>
							<Col xs={12} md={4} className="form-col">
							<ControlLabel>Save DC:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "saveDC"
					            value={this.state.saveDC || 0}
					            onChange={this.handleChange.bind(this)}
					          />
					    </Col>
					    <Col xs={12} md={4} className="form-col">
							<ControlLabel>Damage Per Round:</ControlLabel>
				        	<FormControl
					            type="text"
					            name = "dpr"
					            value={this.state.dpr || 0}
					            onChange={this.handleChange.bind(this)}
					          />
					    </Col>
						</Panel.Body>
					</Panel>
	        	</FormGroup>
	        	</Col>
	        	</Row>
	        	<Row className="formRow">
	        		<FormGroup controlId="healthModifiers">
	        			<Col xs={12} sm={5} className="form-col">
	        				<Panel>
	        					<Panel.Heading>Immunities, Resistances, and Vulnerabilities</Panel.Heading>
										<Panel.Body>
											<Col xs={12} className="form-col">
												<ControlLabel>Imunities:</ControlLabel>
												<HealthMod />
											</Col>
											<Col xs={12} className="form-col">
												<ControlLabel>Resistances:</ControlLabel>
												<HealthMod />
											</Col>
											<Col xs={12} className="form-col">
												<ControlLabel>Vulnerabilities:</ControlLabel>
												<HealthMod />
											</Col>
										</Panel.Body>
	        				</Panel>
	        			</Col>
	        		</FormGroup>
	        	</Row>
		  	</form>
		  </div>
		);
	}
}

export default CreatureBuilder;