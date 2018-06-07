import React, { Component } from 'react';
import { Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix, Row } from "react-bootstrap";
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
  let statBonus = StatCalculationFunctions.getModForStat(statObject);
  if (statBonus) {
    statBonus = "(" + statBonus + ")";
  }

  function getFormLabel() {
    // if (statObject.value || isFocused) {
    //     return StatCalculationFunctions.getShortStatKey(statName);
    // }
    //else {
    return statName;
    //}
  }

  return (
    <div>
      <Col xs={12} md={4} key={statName} className="form-col">
      <strong>{getFormLabel()}  {statBonus}</strong>
        <Row className="statGroup">
          <Col xs={12} sm={12}>
            <FormControl
              type="text"
              name={statName}
              value={statObject.value || ""}
              placeholder="#"
              onChange={onChange}
            />
          </Col>
          <Col xs={12} sm={12} style={{ minHeight: "75px", paddingRight:"0px"}}>
            <FormGroup>
              {/* <div className="profLabel"><strong>Proficiencies:</strong></div> */}
              <ProficiencyList statName={statName} proficiencyObject={statProficiencies} onChange={changeProfficiency} />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default StatGroup;