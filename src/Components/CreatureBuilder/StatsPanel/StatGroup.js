import React, {Component} from 'react';
import {Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix} from "react-bootstrap";
import StatCalculationFunctions from "./StatCalculationFunctions.js";
import ProficiencyList from "./ProficiencyList.js";

//contains the form input for individual stat value and component for proficiencies
const StatGroup = (props) => {
    let statName = props.statName;
    let statObject = props.statObject;
    let statProficiencies = props.statProficiencies;
    let onChange = props.onChange;
    let changeProfficiency = props.changeProfficiency;
    let isFocused = false;

    function getFormLabel() {
        if (statObject.value || isFocused) {
            return StatCalculationFunctions.getShortStatKey(statName);
        }
        else {
            return statName;
        }
    }

    return (
        <Col xs={4} sm={2} key={statName} className="form-col">
            <label className="has-float-label">
            <FormControl
                type="text"
                name = {statName}
                value={statObject.value || ""}
                placeholder={statName}
                onChange = {onChange}
            />
            <span>{getFormLabel()}  {StatCalculationFunctions.getModForStat(statObject)}</span>
            </label>
            <FormGroup>
                <div className="profLabel"><strong>Proficiencies:</strong></div>
                <ProficiencyList statName={statName} proficiencyObject={statProficiencies} onChange={changeProfficiency} />
            </FormGroup>
        </Col>
    );
}

export default StatGroup;