import React, { Component } from "react";
import { Panel, Button, Glyphicon, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import CalculationFunctions from "../CalculationFunctions";
import ActionWrapper from "./ActionWrapper";

const ActionBlock = (props) => {
  return (
    <Col xs={12}>
      {/*Creature Offenses Panel*/}
      <FormGroup controlId="actions">
        <Panel>
          <Panel.Heading>Actions</Panel.Heading>
          <Panel.Body>
            {layoutActions(props)}
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Button bsSize={"xsmall"} bsStyle="primary" onClick={() => {
                props.updateActions("create", null, null);
              }}>
                <Glyphicon glyph="plus" /> Add an Action
            </Button>
            </div>
          </Panel.Body>
        </Panel>
      </FormGroup>
    </Col>
  );
}

function layoutActions(props) {
  return props.actions.map((action, index) => {
    if (Object.keys(action).length === 0) {
      return (
        <div className={"emptyForm"+index} >
        <ActionWrapper
          key={"emptyForm"+index}
          action={action}
          index={index}
          onSubmit={props.updateActions}
          newAction />
        </div>
      );
    }
    return (
      <ActionWrapper
        key={action.name}
        action={action}
        index={index}
        onSubmit={props.updateActions} />
    );
  });
}

export default ActionBlock;