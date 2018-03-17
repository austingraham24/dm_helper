import React from 'react';
import {ButtonGroup, Button} from "react-bootstrap"

//expects callback (function to return value), the value to display (currentValue), and the array of options (Options)
const TemplateSelect = (props) => {

	function generateRatingButtons() {
		return props.Options.map((option) => {
				let active = props.currentValue === option? true : null
				return <Button key={option} bsSize="xsmall" value={option} onClick={props.callback} active={active}>{option}</Button>
			})
	}

	return (
		<div>
			<ButtonGroup>
				<Button bsSize="xsmall" value="" onClick={props.callback}>Clear</Button>
				{generateRatingButtons()}
			</ButtonGroup>
		</div>
	);
}


export default TemplateSelect;