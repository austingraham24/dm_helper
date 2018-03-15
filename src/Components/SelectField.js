import React from 'react';
import {FormControl} from "react-bootstrap";

//expects array as optionArray of string options
const CreatureClassificationSelect = (props) => {

	function generateOptions() {
		if (props.arrayData){
			return props.arrayData.map((value) => {
				return <option key={value} value={value}>{value}</option>
			});
		}
		else if (props.objectData) {
			return Object.keys(props.objectData).map((key) => {
				return <option key={key} value={key}>{props.objectData[key]}</option>
			});
		}
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


export default CreatureClassificationSelect;