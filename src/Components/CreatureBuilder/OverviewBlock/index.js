import React from 'react';
import { Panel, Label, FormGroup, FormControl, ControlLabel, Checkbox, Col, Clearfix, Row } from "react-bootstrap";
import creatureSizes from "../../../Inf/CreatureSize.json";
import SelectField from "../../SelectField.js";
import CreatureClassificationArray from "../../../Inf/CreatureClassification.json";

const OverviewBlock = (props) => {
  return (
    <Panel>
      <Panel.Heading><b>Creature Overview</b></Panel.Heading>
      <Panel.Body>
        {props.children}
      </Panel.Body>
    </Panel>
  );
}

export default OverviewBlock;