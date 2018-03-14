import React, {Component} from 'react';
import "./style.css";
import jsonData from "../../Inf/CreatureStatChart.json";
import ReferenceStats from "./ReferenceStats.js";
import {PageHeader, FormControl, FormGroup, ControlLabel, Grid, Row, Col} from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";

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
		console.log(this.state);
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
				        	<TemplateSelect currentValue={this.state.templateCR} Options={Object.keys(jsonData)} onChange={this.setSelectedCrTemplate.bind(this)} />
					      </FormGroup>
				      </Col>
				    </Row>
			    </Grid>
			  {/* only load the component if state has data saying it should be loaded */}
			    {this.state.templateCR ? <ReferenceStats CR={this.state.templateCR} crData={jsonData[this.state.templateCR]} /> : <div></div>}
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