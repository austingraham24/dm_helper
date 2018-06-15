import React, {Component} from 'react';
import {Button, Glyphicon} from "react-bootstrap";
import PropTypes from 'prop-types';

const statusValues = {
    edit: {style:"primary", glyph:"wrench", label:"Edit"},
    save: {style: "success", glyph: "floppy-save", label: "Save"},
    done: {style: "success", glyph: "ok", label: "Done"},
    cancel: {style: "danger", glyph: "remove", label: "Cancel"},
    delete: {style: "danger", glyph: "remove", label: "Delete"},
    add: {style: "success", glyph: "plus", label: "Add"},
    warn: {style: "warning", glyph: "alert", label: "Warning!"}
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
            <Glyphicon glyph={currentStatus.glyph}/> {props.label || currentStatus.label} />
        </Button>
    );
}

GenericButton.propTypes = {
    /*REQUIRED*/
    onClick: PropTypes.func.isRequired, //the function to call when the button is clicked
    type: PropTypes.oneOf(Object.keys(statusValues)).isRequired, //a key for the kind of button to use

  /*Optional*/
  label:PropTypes.string // an optional override label
}

export default GenericButton;