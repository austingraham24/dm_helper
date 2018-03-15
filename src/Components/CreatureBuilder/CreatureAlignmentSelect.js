import React from 'react';
import {FormControl} from "react-bootstrap";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";

//expects array as optionArray of string options
const CreatureAlignmentOptions = (props) => {

	function generateOptions() {
		return CreatureClassificationArray.map((value) => {
			return <option key={value} value={value}>{value}</option>
		});
	}

	return (
		<FormControl
			componentClass="select"
			name = "classification"
			value={props.stateValue || ""}
			placeholder=""
			onChange={props.onChange}
			>
			  <option value="" hidden>Unknown</option>
			  {generateOptions()}
		</FormControl>
	);
}


export default CreatureAlignmentOptions;