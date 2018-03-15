import React from 'react';
import {ButtonGroup, Button} from "react-bootstrap"

//expects callback (function to return value), the value to display (currentValue), and the array of options (Options)
const TemplateSelect = (props) => {
	//so since "1" is technically less than "1/2" we need to do some manual formatting for the special cases
	let formattedList = [props.Options[0], ...props.Options.slice(2,5).reverse(), props.Options[1], ...props.Options.slice(5)];

	function generateRatingButtons() {
		return formattedList.map((option) => {
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