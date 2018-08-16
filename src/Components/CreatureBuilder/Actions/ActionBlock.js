import React, { Component } from "react";
import { Panel, Button, Glyphicon, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import CalculationFunctions from "../CalculationFunctions";
import UtilityPanel from "../../UtilityPanel";
import ActionWrapper from "./ActionWrapper";
import WeaponAction from "../../Weapon/WeaponAction";

const ActionBlock = (props) => {
  return (
    <Col xs={12}>
      {/*Creature Offenses Panel*/}
      <FormGroup controlId="actions">
        <UtilityPanel
          title="Actions"
          toolbar={[<p>DPR: {(props.dpr || 0)}</p>]}
        >
          {layoutActions(props)}
          {/* <WeaponAction /> */}
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Button bsSize={"xsmall"} bsStyle="primary" onClick={() => {
              props.updateActions("create", null, null);
            }}>
              <Glyphicon glyph="plus" /> Add an Action
          </Button>
          </div>
        </UtilityPanel>
      </FormGroup>
    </Col>
  );
}

function layoutActions(props) {
  return props.actions.map((action, index) => {
    if (Object.keys(action).length === 0) {
      return (
        <ActionWrapper
          key={"emptyForm" + index}
          action={action}
          index={index}
          onSubmit={props.updateActions}
          newAction />
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