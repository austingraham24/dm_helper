import React, { Component } from "react";
import { Panel, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import MovementBlock from "./Movement/MovementBlock";
import LanguageBlock from "./Language/LanguageBlock";
import UtilityPanel from "../../UtilityPanel";
import CalculationFunctions from "../CalculationFunctions";

const AttributePanel = (props) => {
let languages = props.languages || [];
let movement = props.movement || [];

  return (
    <FormGroup controlId="offenseBlock">
      <UtilityPanel title={"Creature Attributes"} defaultOpened>
          <MovementBlock onSubmit={props.onSubmit} movement={movement} />
          <LanguageBlock languages={languages} onSubmit={props.onSubmit} />
      </UtilityPanel>
    </FormGroup>
  );
}

export default AttributePanel;