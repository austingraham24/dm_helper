import React, { Component } from 'react';
import "./style.css";
import { Panel, FormGroup, FormControl, ControlLabel, Col, Glyphicon } from "react-bootstrap";
import HealthMod from "./HealthMod/HealthMod.js"
import UtilityPanel from "../UtilityPanel";
import PropTypes from 'prop-types';
import CalculationFunctions from "./CalculationFunctions";
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

  updateState(field, value) {
    this.setState({[field]: value}, () => {
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
    if (!this.props.hitDice) {
      return null;
    }

    return (
      <span className="form-help">(Hit Dice: {this.props.hitDice})</span>
    );
  }

  render() {
    return (
      <Col xs={12} md={5}>
        <FormGroup controlId="deffenseBlock">
          <UtilityPanel title={"Defense (CR: " + (this.props.defenseProps.defenseCR) + ")"} defaultOpened collapsible>
            <Col xs={12} sm={6} className="form-col">
              <label className="has-float-label">
                <FormControl
                  type="text"
                  name="hp"
                  value={this.state.hp || ""}
                  placeholder="It's dead Jim."
                  onChange={this.handleChange.bind(this)}
                />
                <span>Health Points {this.getHitDice()}</span>
              </label>
            </Col>
            <Col xs={12} sm={6} className="form-col">
              <label className="has-float-label">
                <FormControl
                  type="text"
                  name="ac"
                  value={this.state.ac || ""}
                  placeholder="#GlassCannon"
                  onChange={this.handleChange.bind(this)}
                />
                <span>Armor Class</span>
              </label>
            </Col>
            <Col xs={12} sm={6} className="form-col">
              <ControlLabel>Effective Health Points:</ControlLabel>
              <div>{this.props.defenseProps.effectiveHP || 0}</div>
            </Col>
            <Col xs={12} sm={6} className="form-col">
              <ControlLabel>Effective Armor Class:</ControlLabel>
              <div>{this.props.defenseProps.effectiveAC || 0}</div>
            </Col>
            <Col xs={12} className="form-col">
              <UtilityPanel title="Damage Modifiers">
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
      </Col>
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