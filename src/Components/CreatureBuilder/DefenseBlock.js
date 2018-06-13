import React, { Component } from 'react';
import "./style.css";
import { Panel, FormGroup, FormControl, ControlLabel, Col, Glyphicon, InputGroup, DropdownButton, MenuItem } from "react-bootstrap";
import HealthMod from "./HealthMod/HealthMod.js"
import UtilityPanel from "../UtilityPanel";
import PropTypes from 'prop-types';
import CalculationFunctions from "./CalculationFunctions";
import DiceAverages from "../../Inf/DiceAverages.json";
import AbilitiesBlock from "./Abilities/AbilitiesBlock.js";
import _ from "lodash";

class DefenseBlock extends Component {
  constructor(props) {
    super(props);

    this.modifierMultipliers = [{ lowerBoundCR: 17, resistance: 1, immunity: 1.25 }, { lowerBoundCR: 11, resistance: 1.25, immunity: 1.5 }, { lowerBoundCR: 5, resistance: 1.5, immunity: 2 }, { lowerBoundCR: 0, resistance: 2, immunity: 2 }];
    this.state = {
      hp: 0,
      ac: 0,
      immunities: [],
      resistances: [],
      vulnerabilities: []
    };
  };



  pushChanges = _.debounce(() => {
    this.props.handleChange("defenses", this.state);
  }, 500);

  submitChanges = (dataObject) => {
    this.props.handleChange("defenses", dataObject);
  }

  updateState(field, value) {
    this.setState({ [field]: value }, () => {
      this.pushChanges();
    });
  }

  getExceptionMods(exceptionKey) {
    let mods = [];
    let keys = ["immunities", "resistances", "vulnerabilities"];
    for (var index in keys) {
      if (keys[index] !== exceptionKey) {
        mods = mods.concat(this.state[keys[index]]);
      }
    }
    return mods;
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.updateState(field, value);
  }

  getHitDice() {
    // if (!this.props.hitDice) {
    //   return null;
    // }

    // return (
    //   <span className="form-help">(Hit Dice: {this.props.hitDice})</span>
    // );
    let existingHitDice = this.props.defenseProps.hitDice || null
    let validDice = Object.keys(DiceAverages).map((value, index) => {
      return (
        <MenuItem
          key={value}
          onClick={() => { this.submitChanges({ "hitDice": value }) }}>
          {value}
        </MenuItem>
      );
    });
    let labelExtension = ""
    if (existingHitDice) {
      labelExtension += ": " + existingHitDice;
    }
    return (
      <DropdownButton
        componentClass={InputGroup.Button}
        id="input-dropdown-addon"
        title={"Hit Dice" + labelExtension}
        style={{ borderRadius: "0px 4px 0px 0px", boxShadow: "none" }}
      >
        {validDice}
      </DropdownButton>
    );
  }

  render() {
    return (
      <div>
        <FormGroup controlId="deffenseBlock">
          <UtilityPanel title={"Defense (CR: " + (this.props.defenseProps.defenseCR) + ")"} defaultOpened collapsible>
            <Col xs={12} sm={12} md={7} className="form-col">
              <InputGroup>
                <label className="has-float-label" style={{display:"table-cell"}}>
                  <FormControl
                    type="text"
                    name="hp"
                    value={this.state.hp || ""}
                    placeholder="#"
                    onChange={this.handleChange.bind(this)}
                    style={{ borderRadius: "4px 0px 0px 0px" }}
                  />
                  <span>Health Points</span>
                </label>
                {this.getHitDice()}
                <InputGroup.Addon>+0</InputGroup.Addon>
                <label className="has-float-label" style={{display:"table-cell"}}>
                  <FormControl
                    type="text"
                    name="hp"
                    value={this.state.hp || ""}
                    placeholder="#"
                    onChange={this.handleChange.bind(this)}
                    style={{ borderRadius: "4px 0px 0px 0px" }}
                  />
                  <span>Health Points</span>
                </label>
              </InputGroup>
              <div className="input-addon-bottom">
                <b>Effecitve HP:</b> {this.props.defenseProps.effectiveHP || 0}
              </div>
            </Col>
            {/* <Col xs={12} sm={6} className="form-col">
              <ControlLabel>Effective HP:</ControlLabel>
              <div>{this.props.defenseProps.effectiveHP || 0}</div>
            </Col> */}
            <Col xs={12} sm={12} md={5} className="form-col">
              <label className="has-float-label" style={{ marginBottom: "0px" }}>
                <FormControl
                  type="text"
                  name="ac"
                  value={this.state.ac || ""}
                  placeholder="#"
                  onChange={this.handleChange.bind(this)}
                  style={{ borderRadius: "4px 4px 0px 0px" }}
                />
                <span>Armor Class</span>
              </label>
              <div className="input-addon-bottom">
                <b>Effective AC:</b> {this.props.defenseProps.effectiveAC || 0}
              </div>
            </Col>
            {/* <Col xs={12} sm={6} className="form-col">
              <ControlLabel>Effective AC:</ControlLabel>
              <div>{this.props.defenseProps.effectiveAC || 0}</div>
            </Col> */}
            <Col xs={12}>
              <AbilitiesBlock />
            </Col>
            <Col xs={12} className="form-col">
              <UtilityPanel title="Damage Modifiers" style={{ marginBottom: "0px" }} collapsible>
                <HealthMod
                  name="Immunities"
                  prefill={this.state.immunities}
                  updateMods={this.updateState.bind(this)}
                  exceptionMods={this.getExceptionMods("immunities")}
                />
                <HealthMod
                  name="Resistances"
                  prefill={this.state.resistances}
                  updateMods={this.updateState.bind(this)}
                  exceptionMods={this.getExceptionMods("resistances")}
                />
                <HealthMod
                  name="Vulnerabilities"
                  prefill={this.state.vulnerabilities}
                  updateMods={this.updateState.bind(this)}
                  exceptionMods={this.getExceptionMods("vulnerabilities")}
                />
              </UtilityPanel>
            </Col>
          </UtilityPanel>
        </FormGroup>
      </div>
    );
  }
}

DefenseBlock.propTypes = {
  /*REQUIRED*/
  handleChange: PropTypes.func.isRequired, //the method to call when the component's state has changed

  /*Optional*/
  hitDice: PropTypes.string, //the hit dice to use
  defenseProps: PropTypes.object //the defense state of the parent, used for passing calculated values like effectiveHP
}

export default DefenseBlock;