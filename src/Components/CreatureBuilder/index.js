import React, {Component} from 'react';
import "./style.css";
import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import SelectField from "../SelectField.js"
import HealthMod from "./HealthMod.js"
import DefenseBlock from "./DefenseBlock.js";
import PropTypes from 'prop-types';

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);
		//so since "1" is technically less than "1/2" we need to do some manual formatting for the special cases
		let keys = Object.keys(CreatureStats).sort();
		let sortedKeys = [keys[0], ...keys.slice(2,5).reverse(), keys[1], ...keys.slice(5)];

		let alignments = {"none":"Unaligned", "lg":"Lawful Good", "ng":"Neutral Good", "cg":"Chaotic Good", "ln":"Lawful Neutral", "n":"Neutral", "cn":"Chaotic Neutral", "le":"Lawful Evil", "ne":"Neutral Evil", "ce":"Chaotic Evil"}
		let damageTypes = ["Fire","Thunder","Radiant","Poison","Slashing","Piercing","Bludgeoning","Lightning", "Psychic", "Necrotic", "Cold", "Acid"]
		this.state = {
			crKeys: sortedKeys,
			templateCR: null,
			damageTypes: damageTypes,
			type:"",
			name:"",
			sizes:creatureSizes,
			alignments: alignments,
			allowFieldOverrides: false
		};
	};

	componentDidUpdate(prevProps, prevState) {
	}

	setSelectedCrTemplate(event) {
		let value = event.target.value || null
		this.setState({templateCR: value});
	}

	getCRData() {
		return this.state.templateCR ? CreatureStats[this.state.templateCR] : null
	}

	getHitDice() {
		return this.state.size? creatureSizes[this.state.size] : null
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

	updateDefensiveData(newData) {
		let object = {defenseBlock: newData}
		this.setState({...object});
	}

	calculateCR(field, value, referenceCR = null) {
		//console.log(field,value);
		if (value === null || value === undefined || value === "") {
			return 0;
		}

		let cr;

		if (referenceCR !== null && referenceCR !== undefined) {
			let dataValue = CreatureStats[referenceCR][field]
			if (isNaN(dataValue)) {
				let dataArray = dataValue.split("-").map((value) => {
					return parseInt(value);
				});
				if ((value >= dataArray[0]) && (value <= dataArray[1])) {
					return referenceCR;
				}
			}
			else {
				if (value == dataValue) {
					return referenceCR;
				}
			}
		}
		var index;
		for (index in this.state.crKeys) {
			let rating = this.state.crKeys[index];
			let dataValue = CreatureStats[rating][field];
			if (isNaN(dataValue)) {
				let dataArray = dataValue.split("-").map((value) => {
					return parseInt(value);
				});
				if (index == 0) {
					if (value < dataArray[0]) {
						cr = 0;
						break;
					}
				}
				if ((value >= dataArray[0]) && (value <= dataArray[1])) {
					cr = rating;
					break;
				}
			}

			else {
				if (index == 0) {
					if (value < dataValue) {
						cr = 0;
						break;
					}
				}
				if (value === dataValue) {
					cr = rating;
					break;
				}
			}
		}
		return (cr !== undefined? cr : this.state.crKeys.slice(-1)[0]);
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
			        	<TemplateSelect currentValue={this.state.templateCR} Options={this.state.crKeys} callback={this.setSelectedCrTemplate.bind(this)} />
				      	<ReferenceStatTable CR={this.state.templateCR} crData={this.getCRData()} />
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
						      <SelectField name="size" arrayData={Object.keys(creatureSizes)} placeholder="Select Size" onChange={this.handleChange.bind(this)} stateValue={this.state.size}/>
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
		      	{/*Creature Defenses Panel*/}
	        	<Row className="formRow">
	        	<DefenseBlock damageTypes={this.state.damageTypes} crKeys={this.state.crKeys} handleChange={this.updateDefensiveData.bind(this)} CRMethod={this.calculateCR.bind(this)} hitDice={this.getHitDice()} />
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