import React, { Component, Fragment } from 'react';
import { Form, Tooltip, OverlayTrigger, PageHeader, MenuItem, DropdownButton, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon } from "react-bootstrap";
import _ from "lodash";
import "./style.css";
import SelectField from "../../SelectField.js";
import CalculationFunctions from "../CalculationFunctions.js";
import DiceAverages from "../../../Inf/DiceAverages.json";

class DiceForm extends Component {
  constructor(props) {
    super(props);

    this.debouncedCalcAvg = _.debounce(this.calcAverageDamage, 1000);
    this.debouncedCalcExpression = _.debounce(this.calcDiceExpression, 1000);

    this.state = {
      formIsValid: false,
      flatDamage: this.props.flatDamage,
      diceExpression: this.props.diceExpression,
      dmgType: this.props.dmgType
    };
  }

  submitChanges(action) {
    if(!this.props.submitFunction) {
      return
    }
    let newDamageObject = {
      flatDamage: this.state.flatDamage,
      diceExpression: this.state.diceExpression,
      dmgType: this.state.dmgType
    }
    this.props.submitFunction(action, this.props.index, newDamageObject);
  }

  hasUpdated() {
    if((this.props.flatDamage !== this.state.flatDamage) ||
    (this.props.diceExpression !== this.state.diceExpression) ||
    (this.props.dmgType !== this.state.dmgType)) {
      return true;
    }
    return false;
  }

  //basically the master onChange function. all debounces and regular functions route through this to update state
  //keeps validation in one place before updating state
  updateState(key, value) {
    let newState = { ...this.state, [key]: value };
    let validForm = false;
    if (newState.dmgType && newState.flatDamage) {
      validForm = true;
    }
    this.setState({ ...newState, formIsValid: validForm });
  }

  updateDMGType(event) {
    let type = event.target.name.split("-")[1];
    this.updateState("dmgType",type);
  }

  onChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    if (field === "diceExpression") {
      this.debouncedCalcAvg(value); //
    }
    else if (field === "flatDamage") {
      this.debouncedCalcExpression(value)
    }
    this.updateState(field,value);
  }

  calcDiceExpression(flatDamage) {
    if (!flatDamage || isNaN(flatDamage) || !this.state.diceExpression) {
      return
    }
    let diceType = this.parseExpresion(this.state.diceExpression).type;
    let diceAverage = DiceAverages["d" + diceType];
    if (isNaN(diceType) || !diceAverage) {
      console.log("Not valid dice or no average for that kind of dice");
      return
    }

    let count = Math.floor(flatDamage / diceAverage);
    let remainder = Math.ceil(flatDamage % diceAverage);
    let expression = count + "d" + diceType + ((remainder > 0) ? "+" + remainder : "");
    this.updateState("diceExpression",expression);
  }

  calcAverageDamage(expression) {
    if (!expression) {
      return
    }
    let parsed = this.parseExpresion(expression);
    let mod = parsed.mod || 0;
    let count = parsed.count;
    let type = parsed.type;
    if (type && !count) {
      this.calcDiceExpression(this.state.flatDamage);
      return
    }
    else if (!type) {
      return
    }
    let avg = DiceAverages["d" + type] || 0;
    let final = Math.ceil((avg * count) + mod);
    this.updateState("flatDamage",final);
  }

  parseExpresion(expression) {
    let splitExpression = expression.split("d")
    if (splitExpression.length > 1) {
      let mod = 0;
      let num = splitExpression[0].trim();
      let splitType = splitExpression[1].split("+");
      let type = splitType[0].trim();
      if (splitType.length > 1) {
        mod = parseFloat(splitType[1].trim()) || 0
      }
      return { count: num, type: type, mod: mod };
    }
    return { type: expression };
  }

  layoutDamageOptions() {
    return CalculationFunctions.damageTypes.map((dmg) => {
      return <MenuItem name={"dmgType-" + dmg} onClick={this.updateDMGType.bind(this)} key={dmg}>{dmg}</MenuItem>
    })
  }

  getTooltip(type) {
    if (type == "expression") {
      return (
        <Tooltip id="diceExpressionToolTip">
          ex: "2d6+10" or put dice type (ex: d6) and avg damage to auto calculate an expression
                </Tooltip>
      );
    }
    else if (type == "avg") {
      return (
        <Tooltip id="diceExpressionToolTip">
          changing this value recalculates the dice expression with the current die. To change die type, delete the expression and enter a valid die type (ex: d12).
                </Tooltip>
      );
    }
    else if (type == "validWarn") {
      return (
        <Tooltip id="diceExpressionToolTip">
          You are required to enter a damage type and damage amount.
              </Tooltip>
      );
    }
    else {
      return
    }
  }

  getButton() {
    if (this.props.defaultEmpty) {
      if (this.state.formIsValid) {
        return <Button bsStyle="success" onClick={() => {this.submitChanges("add")}}><Glyphicon glyph="plus" /></Button>
      }
      return (
        <OverlayTrigger
          overlay={this.getTooltip("validWarn")}
          placement="top"
          delayShow={100}
          delayHide={150}
        >
          <Button bsStyle="warning"><Glyphicon glyph="alert" /></Button>
        </OverlayTrigger>
      );
    }
    if(this.hasUpdated()) {
      return <Button bsStyle="success" onClick={() => {this.submitChanges("update")}}><Glyphicon glyph="floppy-save" /></Button>
    }
    return <Button bsStyle="danger" onClick={() => {this.submitChanges("delete")}}><Glyphicon glyph="remove" /></Button>

  }

  render() {
    return (
      <Fragment>
        <Row style={{ marginBottom: "10px" }}>
          <Col xs={12}>
            <InputGroup bsSize="small">
              <OverlayTrigger
                overlay={this.getTooltip("expression")}
                placement="top"
                delayShow={300}
                delayHide={150}
              >
                <label className="has-float-label">
                  <FormControl
                    bsSize="small"
                    type="text"
                    name="diceExpression"
                    value={this.state.diceExpression || ""}
                    placeholder="2d12+5"
                    onChange={this.onChange.bind(this)}
                  />
                  <span>Dice Expression</span>
                </label>
              </OverlayTrigger>
              <InputGroup.Addon>
                or
                    </InputGroup.Addon>
              <OverlayTrigger
                overlay={this.getTooltip("avg")}
                placement="top"
                delayShow={300}
                delayHide={150}
              >
                <label className="has-float-label">
                  <FormControl
                    bsSize="small"
                    type="text"
                    name="flatDamage"
                    value={this.state.flatDamage}
                    placeholder="2"
                    onChange={this.onChange.bind(this)}
                  />
                  <span>Average DMG</span>
                </label>
              </OverlayTrigger>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="damage-dropdown-addon"
                title={this.state.dmgType || "DMG"}
              >
                {this.layoutDamageOptions()}
              </DropdownButton>
              <InputGroup.Button>
                {this.getButton()}
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default DiceForm;