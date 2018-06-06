import React, { Component } from "react";
import { Panel, FormGroup, FormControl, ControlLabel, Col } from "react-bootstrap";
import ActionBlock from "./Actions/ActionBlock";
import UtilityPanel from "../UtilityPanel";
import CalculationFunctions from "./CalculationFunctions";

const OffenseBlock = (props) => {
  let offenseCR = props.offenseProps.offenseCR || 0;
  let saveDC = props.offenseProps.saveDC || "";
  let attackBonus = props.offenseProps.attackBonus || "";
  let dpr = props.offenseProps.dpr || "";
  let actions = props.offenseProps.actions || [];

  let pushChanges = (dataObject) => {
    let newData = {}
    if(props.offenseProps) {
      newData = {...props.offenseProps}
    }
    newData = {...dataObject}
    if (newData.actions.length > 0) {
      newData.dpr = calcDPR(newData.actions);
    }
    props.handleChange("offenses", newData);
    return
  }
  
  let handleChange = (event) => {
    let fieldName = event.target.name
    let newValue = event.target.value
    let newDataObject = { ...props.offenseProps }
    newDataObject[fieldName] = newValue;
    pushChanges(newDataObject);
    return
  }

  let updateActions = (action, index, object) => {
    let newActions = [];
    if (actions) {
      newActions = [...actions];
    }
    switch (action) {
      case "create":
      newActions.push({});
        break;
      case "update":
      newActions.splice(index, 1, object);
        break;
      case "delete":
      newActions.splice(index, 1);
        break;
    }

    let newData = {actions: newActions};
    if(newActions.length == 0) {
      newData["dpr"] = null;
    }
    pushChanges(newData);
  }

  return (
    <div>
      <FormGroup controlId="offenseBlock">
        <UtilityPanel title={"Offense (CR: " + offenseCR + ")"} defaultOpened collapsible>
          <Col xs={12} md={4} className="form-col">
            <label className="has-float-label">
              <FormControl
                type="text"
                name="attackBonus"
                placeholder="Enter Number Value"
                value={attackBonus}
                onChange={handleChange}
              />
              <span>Attack Bonus</span>
            </label>
          </Col>
          <Col xs={12} md={4} className="form-col">
            <label className="has-float-label">
              <FormControl
                type="text"
                name="saveDC"
                placeholder="Enter Number Value"
                value={saveDC}
                onChange={handleChange}
              />
              <span>Save DC</span>
            </label>
          </Col>
          <Col xs={12} md={4} className="form-col">
            <label className="has-float-label">
              <FormControl
                type="text"
                name="dpr"
                placeholder="Enter Number Value"
                value={dpr}
                onChange={handleChange}
              />
              <span>Damage Per Round</span>
            </label>
          </Col>
          <ActionBlock actions={actions} updateActions={updateActions} />
        </UtilityPanel>
      </FormGroup>
    </div>
  );
}

function getDamageOutput(damageItem) {
  let damage = 0;
  if (damageItem) {
    damageItem.forEach((item) => {
      damage += parseInt(item.flatDamage);
    });
  }
  return damage;
}

function calcDPR(actionList) {
  if (!actionList || actionList.length == 0) {
    return this.props.dpr;
  }
  let highestDamageIndex = null;
  actionList.forEach((action, index) => {
    if(action.damage == undefined || action.damage == null) {
      return
    }
    if (index == 0) {
      highestDamageIndex = 0
      return 
    }
    if (getDamageOutput(action.damage) > (getDamageOutput(actionList[highestDamageIndex].damage))) {
      highestDamageIndex = index;
    }
    return
  });
  if(highestDamageIndex == undefined) {
    return this.props.dpr;
  }
  return getDamageOutput(actionList[highestDamageIndex].damage)
}

export default OffenseBlock;