import React, {Component} from 'react';
import {Button, Glyphicon} from "react-bootstrap";
import PropTypes from 'prop-types';

const statusValues = {
    edit: {style:"primary", glyph:"wrench", label:"Edit"},
    save: {style: "success", glyph: "floppy-save", label: "Save"},
    done: {style: "success", glyph: "ok", label: "Done"},
    cancel: {style: "danger", glyph: "remove", label: "Cancel"},
    delete: {style: "danger", glyph: "remove", label: "Delete"}
}

const GenericButton = (props) => {
    var currentStatus = statusValues[props.type];
    if(!currentStatus || !props.onClick) {
        return
    }
    return (
        <Button 
            bsSize="xs" 
            bsStyle={currentStatus.style} 
            onClick={props.onClick}
            style={props.style}
        >
            <Glyphicon glyph={currentStatus.glyph}/> {currentStatus.label}
        </Button>
    );
}

GenericButton.propTypes = {
    /*REQUIRED*/
    onClick: PropTypes.func, //the function to call when the button is clicked
    type: PropTypes.oneOf(Object.keys(statusValues)) //a key for the kind of button to use

	/*Optional*/
}

export default GenericButton;