import React from 'react';
import {FormControl} from "react-bootstrap";
import PropTypes from 'prop-types';

const SelectField = (props) => {
	if (!props.arrayData && !props.objectData) {
		return null
	}

	function hasPlaceholder() {
		if (!props.placeholder) {
			return null
		}
		return <option key={props.placeholder} value="" hidden>{props.placeholder}</option>
	}

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

function isDisabled() {
  if (props.disabled) {
    return true
  }
  return false
}

	return (
		<FormControl
			componentClass="select"
			name = {props.name || ""}
			value={props.stateValue || ""}
      placeholder=""
      style={props.style || {}}
      onChange={props.onChange}
      disabled={ isDisabled() }
			>
				{hasPlaceholder()}
			  {generateOptions()}
		</FormControl>
	);
}

SelectField.propTypes = {
	/*REQUIRED*/
  name: PropTypes.string.isRequired, //gives the select field a name; useful use in the onChange methode to know which piece of state to change
  onChange: PropTypes.func.isRequired, //the method to call when the field is changed

  /*OPTIONAL*/
  arrayData: PropTypes.arrayOf(PropTypes.string), //a list of simple strings where each is a unique and individual option
  objectData: PropTypes.object, //an object {value:display} where value is used as the key and value and the display is what is shown to the user
  /*note: one of the above must not be null in order for the compoenent to render*/
  placeholder: PropTypes.string, //a hidden option to be shown as a default rather than the first item in the array/object
  stateValue: PropTypes.string, //the value the current form state has; if null the field defaults to value=""
  disabled: PropTypes.bool // is the field disabled
}

export default SelectField;