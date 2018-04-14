import React, {Component} from 'react';
import {Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix} from "react-bootstrap";
import StatCalculationFunctions from "./StatCalculationFunctions.js";
import ProficiencyList from "./ProficiencyList.js";

//contains the form input for individual stat value and component for proficiencies
const StatGroup = (props) => {
    let statName = props.statName;
    let stat = props.stat;
    let statProficiencies = props.statProficiencies;
    let onChange = props.onChange;
    let changeProfficiency = props.changeProfficiency;

    return (
        <Col xs={4} sm={2} key={statName} className="form-col">
            <ControlLabel>{statName}: {StatCalculationFunctions.getModForStat(stat)}</ControlLabel>
            <FormControl
                type="text"
                name = {statName}
                value={stat.value || ""}
                onChange = {onChange}
            />
            <FormGroup>
                <div className="profLabel"><strong>Proficiencies:</strong></div>
                <ProficiencyList statName={statName} proficiencyObject={statProficiencies} onChange={changeProfficiency} />
            </FormGroup>
        </Col>
    );
}

export default StatGroup;