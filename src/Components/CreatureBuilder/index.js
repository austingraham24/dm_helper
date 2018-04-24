import React, {Component} from 'react';
import "./style.css";
import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col} from "react-bootstrap";
import PanelButtonToggle from "../PanelButtonToggle/PanelButtonToggle.js";
import TemplateSelect from "./TemplateSelect.js";
import StatsPanel from "./StatsPanel/StatsPanel.js";
import SelectField from "../SelectField.js"
import DefenseBlock from "./DefenseBlock.js";
import OffenseBlock from "./OffenseBlock.js";
import MovementBlock from "./Movement/MovementBlock.js";
import LanguageBlock from "./Language/LanguageBlock.js";
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
			defenses: {
				defenseCR: 0,
				hp: 0,
				ac: 0,
				effectiveHP: 0,
				effectiveAC: 0,
				immunities: [],
				resistances: [],
				vulnerabilities: []
			},
			offenses: {
				offenseCR: 0,
				saveDC: 0,
				attackBonus: 0,
				dpr: 0
			},
			stats: {},
			languages: ["Common","Draconic"],
			proficiencies: {},
			movement: []
		};
	};

	setSelectedCrTemplate(event) {
		let value = event.target.value || null
		this.setState({templateCR: value});
	}

	handleChange(event) {
		let newDataObject={...this.state};
		newDataObject[event.target.name] = event.target.value;
		if (!this.state.allowFieldOverrides) {
			//this.setState({challengeRating: hpCR})
		}
		this.precalculateFormChanges(newDataObject);
		//console.log(this.calculateCR(event.target.name, event.target.value));
	}

	updateNonCalculatedProperties(propName, data) {
		this.setState({[propName]: data});
	}

	//method that will actually end up updating state; runs all calculations to get updated values before updating state
	//ex: EffectiveHP and defesive CR is influenced by other parts of the form so this does a pre-screen before changing state
	precalculateFormChanges(dataObject) {
		let newState = dataObject;
		newState = CalculationFunctions.calculateFinalCR(newState);
		//console.log(newState);
		this.setState({...newState});
	}

	updateDefensiveData(newDataObject) {
		let currentState = this.state;
		//we will be storing calculated values in the defense block of state that don't exist in the component's state
		//to make sure we dont overwrite that piece of state, get the current defensive state then adjust fields as necessary
		let newDefenseState = this.state.defenses;
		newDefenseState = {...newDefenseState,...newDataObject};
		let newState = {...currentState, defenses: {...newDefenseState}};
		//console.log(newState);
		this.precalculateFormChanges(newState);
	}

	updateOffenseData(dataObject) {
		let currentState = this.state;
		//we will be storing calculated values in the defense block of state that don't exist in the component's state
		//to make sure we dont overwrite that piece of state, get the current defensive state then adjust fields as necessary
		let newOffenseState = this.state.offenses;
		newOffenseState = {...newOffenseState,...dataObject};
		let newState = {...currentState, offenses: {...newOffenseState}};
		//console.log(newState);
		this.precalculateFormChanges(newState);
	}

	render() {
		return (
		  <div className="container">
		  	<PageHeader>Creature Builder</PageHeader>
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
						<Row>
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
						</Row>
						<Row className="formRow">
							<MovementBlock onSubmit={this.updateNonCalculatedProperties.bind(this)} movement={this.state.movement}/>
							<LanguageBlock languages={this.state.languages} onSubmit={this.updateNonCalculatedProperties.bind(this)} />
						</Row>
						{/* <Row className="formRow">
							<Col xs={12} md={5}>
								<PanelButtonToggle title="Languages and Senses" defaultOpened >
									<h1>Test</h1>
								</PanelButtonToggle>
							</Col>
							<Col xs={12} md={7}>
								<PanelButtonToggle title="Abilities and Condition Immunities" defaultOpened >
									<h1>Test</h1>
								</PanelButtonToggle>
							</Col>
						</Row> */}
					</Panel.Body>
				</Panel>
				<Row className="formRow" style={{"padding":"0px"}}>
					<StatsPanel />
				</Row>
	        	<Row className="formRow">
				{/*Creature Defenses Panel*/}
	        	<DefenseBlock handleChange={this.updateDefensiveData.bind(this)} hitDice={creatureSizes[this.state.size] || null} defenseProps={this.state.defenses} />
	        	{/*Creature Offenses Panel*/}
				<OffenseBlock handleChange = {this.updateOffenseData.bind(this)} offenseProps={this.state.offenses}/>
	        	</Row>
		  </div>
		);
	}
}

export default CreatureBuilder;