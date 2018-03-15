import React from 'react';

//expects array as optionArray of string options
const CreatureAlignmentOptions = (props) => {
	return props.optionArray.map((value) => {
		return <option key={value} value={value}>{value}</option>
	});
}


export default CreatureAlignmentOptions;