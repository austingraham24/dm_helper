import React, {Component} from 'react';
import "./style.css";
import jsonData from "../../Inf/CreatureStatChart.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import {PageHeader, Button, FormGroup, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import PropTypes from 'prop-types';

class CreatureBuilder extends Component {
	constructor(props) {
		super(props);

		this.state = {
			templateCR: null
		};
	};

	setSelectedCrTemplate(event) {
		console.log(event.target.value)
		let value = event.target.value || null
		this.setState({templateCR: value});
		//console.log(this.state);
	}

	showTemplate() {
		return (this.state.templateCR != null)
	}

	getCRData() {
		return this.state.templateCR ? jsonData[this.state.templateCR] : null
	}

	render() {
		return (
		  <div className="container">
		  	<PageHeader>Creature Builder</PageHeader>
		  	<form>
		  		<Grid>
				    <Row className="show-grid">
				      <Col sm={6} md={3}>
				        <FormGroup controlId="formControlsSelect">
				        	<ControlLabel>View Quick Stats for CR</ControlLabel>
				        	<TemplateSelect currentValue={this.state.templateCR} Options={Object.keys(jsonData)} callback={this.setSelectedCrTemplate.bind(this)} />
					      </FormGroup>
				      </Col>
				    </Row>
			    </Grid>
					<ReferenceStatTable CR={this.state.templateCR} crData={this.getCRData()} />
		  		<label>
		  			Expected Challenge Rating:
		  		</label><br/>
		  		<label>
		  			Name:
		  		</label>
		  	</form>
		  </div>
		);
	}
}

export default CreatureBuilder;