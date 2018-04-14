import React, {Component} from 'react';
import {Checkbox} from "react-bootstrap";

//lists checkboxes for all proficiencies under a given stat
const ProficiencyList = (props) => {
    let statName = props.statName;
    let statProficiencies = props.proficiencyObject;
    let onChange = props.onChange;

    return (
        Object.keys(statProficiencies).map((key) => {
            let isActive = statProficiencies[key];
            return  <Checkbox checked={isActive} name={statName+"-"+key} key={key} onChange={onChange} bsClass="checkbox profCheckBox">{key}</Checkbox>
        })
    );
}

export default ProficiencyList;