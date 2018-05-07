import React, {Component} from 'react';
import {Button, Glyphicon} from "react-bootstrap";
import PropTypes from 'prop-types';

const GenericButton = (props) => {
    const statusValues = {
        edit: {style:"primary", glyph:"wrench", label:"Edit"},
        save: {style: "success", glyph: "floppy-save", label: "Save"}
    }

    var currentStatus = statusValues[props.type];
    if(!currentStatus || !props.onClick) {
        return
    }
    return (
        <Button 
            bsSize="xs" 
            bsStyle={currentStatus.style} 
            onClick={props.onClick}
        >
            <Glyphicon glyph={currentStatus.glyph}/> {currentStatus.label}
        </Button>
    );
}

GenericButton.propTypes = {
    /*REQUIRED*/
    onClick: PropTypes.func, //the function to call when the button is clicked
    type: PropTypes.oneOf(['edit', 'save']) //a key for the kind of button to use

	/*Optional*/
}

export default GenericButton;