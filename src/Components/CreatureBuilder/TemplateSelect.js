import React, {Component} from 'react';
import "./style.css";
import jsonData from "../../Inf/CreatureStatChart.json";
import ReferenceStats from "./ReferenceStats.js";
import {PageHeader, FormControl, FormGroup, ControlLabel, Grid, Row, Col} from "react-bootstrap"

//expects a callback for onChange (onChange), the value to display (currentValue), and the array of options (Options)
const TemplateSelect = (props) => {
	//so since "1" is technically less than "1/2" we need to do some manual formatting for the special cases
	let formattedList = [props.Options[0], ...props.Options.slice(2,5), props.Options[1]];
	return (
		<FormControl componentClass="select" placeholder={props.currentValue} onChange={props.onChange}>
			<option value="">None</option>
	        {formattedList.map((value) => {
				return <option key= {value} value={value}>{value}</option>
			})}
		</FormControl>
	);
}

export default TemplateSelect;