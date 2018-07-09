import React, { Component } from 'react';
import "./style.css";
import { Panel, FormGroup, FormControl, ControlLabel, Col, Glyphicon, InputGroup, DropdownButton, MenuItem, Popover, OverlayTrigger, Button } from "react-bootstrap";
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
      immunities: [],
      resistances: [],
      vulnerabilities: []
    };
  };

  handleChange = (dataObject) => {
    this.props.handleChange("defenses", dataObject);
  }

  updateState(field, value) {
    this.setState({ [field]: value }, () => {
      this.handleChange(this.state);
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

  onChange(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.handleChange({[field]:value});
  }

  getHitDice() {
    let existingHitDice = this.props.defenseProps.hitDice || null
    let validDice = Object.keys(DiceAverages).map((value, index) => {
      var active = false
      if (existingHitDice == value) {
        active = true
      }
      return (
        <option key={value} value={value}>{value} ({DiceAverages[value]})</option>
      );
    });

    return (
      <FormControl
        componentClass="select"
        placeholder=""
        onChange={(event) => { this.handleChange({"hitDice": event.target.value }) }}
        style={{ borderRadius: "0px", padding: "2px" }}
        value={existingHitDice || ""}>
        <option value="" hidden>Hit Dice</option>
        {validDice}
      </FormControl>
    );
  }

  effectiveHPPopover() {
    return (
      <Popover id="effectiveHPPopover" title="Not what you expect?" style={{ maxWidth: "500px" }}>
        <b>Formula: </b><br />((Die # <b>x</b> AVG) + (CONST Mod <b>x</b> Die #) + Bonus) <b>x</b> Damage Mod (ex. 1.25)<br />
        For specific Damage Modifers, <b>See DM Handbook pg.277</b>
      </Popover>
    );
  }

  effectiveACPopover() {
    return (
      <Popover id="effectiveACPopover" title="What is this?" style={{ maxWidth: "350px" }}>
        Some spells, abilities, and items add a bonus to AC. This value changes to reflect those bonuses and is the value used in CR calculations.
      </Popover>
    );
  }

  render() {
    let constitution = this.props.defenseProps.constitution;
    let constMod = constitution ? constitution.mod : null;
    return (
      <div>
        <FormGroup controlId="deffenseBlock">
          <UtilityPanel title={"Defense (CR: " + (this.props.defenseProps.defenseCR) + ")"} defaultOpened collapsible>
            <Col xs={12} sm={12} md={8} className="form-col">
              <div style={{ display: "table" }}>
                <div style={{ display: "table-row" }}>
                  <InputGroup style={{ width: "100%" }}>
                    <label className="has-float-label" style={{ display: "table-cell", width: "25%" }}>
                      <FormControl
                        type="text"
                        name="diceCount"
                        value={this.props.defenseProps.diceCount || ""}
                        placeholder="#"
                        onChange={this.onChange.bind(this)}
                        style={{ borderRadius: "4px 0px 0px 0px" }}
                      />
                      <span>Die #</span>
                    </label>
                    {this.getHitDice()}
                    <label className="has-float-label" style={{ display: "table-cell", width: "25%" }}>
                      <FormControl
                        type="text"
                        name="bonus"
                        value={this.props.defenseProps.bonus || ""}
                        placeholder="#"
                        onChange={this.onChange.bind(this)}
                        style={{ borderRadius: "0px 4px 0px 0px", borderLeft: "0px" }}
                      />
                      <span>Bonus</span>
                    </label>
                  </InputGroup>
                </div>
                <div style={{ display: "table-row" }}>
                  <div style={{ display: "table", width: "100%" }}>
                    <div className="input-addon-bottom" style={{ display: "table-cell", width: "40%" }}>
                      <b>AVG HP:</b> {this.props.defenseProps.hp || 0}
                    </div>
                    <div style={{ display: "table-cell" }}>
                      <OverlayTrigger
                        trigger="click"
                        rootClose
                        placement="bottom"
                        overlay={this.effectiveHPPopover()}
                      >
                        <div className="input-addon-bottom" style={{ cursor: "help" }}>
                          <b>AVG Effecitve HP:</b> {this.props.defenseProps.effectiveHP || 0}
                        </div>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={4} className="form-col">
              <label className="has-float-label" style={{ marginBottom: "0px" }}>
                <FormControl
                  type="text"
                  name="ac"
                  value={this.props.defenseProps.ac || ""}
                  placeholder="#"
                  onChange={this.onChange.bind(this)}
                  style={{ borderRadius: "4px 4px 0px 0px" }}
                />
                <span>Armor Class</span>
              </label>
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="bottom"
                overlay={this.effectiveACPopover()}
              >
                <div className="input-addon-bottom" style={{ cursor: "help" }}>
                  <b>Effective AC:</b> {this.props.defenseProps.effectiveAC || 0}
                </div>
              </OverlayTrigger>
            </Col>
            {/* <Col xs={12} sm={6} className="form-col">
              <ControlLabel>Effective AC:</ControlLabel>
              <div>{this.props.defenseProps.effectiveAC || 0}</div>
            </Col> */}
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