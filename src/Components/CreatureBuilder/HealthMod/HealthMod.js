import React, {Component} from 'react';
import "./style.css";
import {PageHeader, Button, InputGroup, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Glyphicon} from "react-bootstrap";

class HealthMod extends Component {
	constructor(props) {
		super(props);
		let damageTypes = ["Fire","Thunder","Radiant","Poison","Slashing","Piercing","Bludgeoning","Lightning", "Psychic", "Necrotic", "Force", "Cold", "Acid"]
		let selectedValues = []
		//let sizes = {"tiny":"Tiny", "small": "Small", "medium": "Medium", "large":"Large", "huge":"Huge", "gargantuan":"Gargantuan"}
		let isEditing = false;
		this.state = {damageTypes, selectedValues, isEditing};
	};

	toggleTypeActive(event) {
		let type = event.target.name;
		let newArray;
		if (this.state.selectedValues.includes(type)) {
			let index = this.state.selectedValues.indexOf(type);
			newArray = this.state.selectedValues;
			newArray.splice(index,1)
		}
		else {
			newArray = this.state.selectedValues;
			newArray.push(type);
		}
		this.setState({...this.state, selectedValues:newArray})
	}

	toggleEditing(){
		let editing = !(this.state.isEditing)
		this.setState({...this.state, isEditing:editing});
	}

	generateEditButton() {
		let glyph, text;
		if (this.state.isEditing) {
			glyph = "ok";
			text = "Accept"
		}
		else {
			glyph = "wrench";
			text = "Edit"
		}
		return <Button bsSize="xs" onClick={this.toggleEditing.bind(this)} className="type-segment"><Glyphicon glyph={glyph} bsSize="xsmall"/> <strong>{text}</strong></Button>
	}

	layoutMods() {
		var shownTypes;
		if (this.state.isEditing) {
			shownTypes = this.layoutDamageTypes();
		}
		else {
			shownTypes = this.layoutSelectedDamageTypes()
		}

		return (
			<div>
				{shownTypes}
				{this.generateEditButton()}
				</div>
		);
	}

	layoutSelectedDamageTypes(){
		return this.state.selectedValues.map((damageType) => {
			return <Button id={this.props.name + "-" + damageType} name={damageType} key={damageType} bsSize="xs" className={damageType.toLowerCase() + " damageType-token type-segment"}>{damageType}</Button>
		});
	}

	layoutDamageTypes() {
		return this.state.damageTypes.map((damageType) => {
			let isSelected="";
			if (this.state.selectedValues.includes(damageType)) {
				isSelected = " active";
			}
			return <Button onClick={this.toggleTypeActive.bind(this)} key={damageType} name={damageType} bsSize="xs" className={damageType.toLowerCase() + " damageType-token editing type-segment" + isSelected}>{damageType}</Button>
		});
	}

	render() {
		return (
			<div className="typeList">
				<Row className="labelRow">
					<Col xs={12}>
						<ControlLabel>{this.props.name}:</ControlLabel>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
					{this.layoutMods()}
					</Col>
				</Row>
			</div>
		);
	}
}

export default HealthMod;