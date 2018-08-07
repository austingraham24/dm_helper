import React, { Component } from 'react';
import "./weaponAction.css";
import { Panel, FormGroup, FormControl, ControlLabel, Col, Glyphicon, InputGroup, DropdownButton, MenuItem, Popover, OverlayTrigger, Button } from "react-bootstrap";
import UtilityPanel from "../../UtilityPanel";
import PropTypes from 'prop-types';
import DiceAverages from "../../../Inf/DiceAverages.json";
import DefaultWeapons from "../../../Inf/Weapons.json";
import _ from "lodash";
import SelectField from "../../SelectField";

class WeaponAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingWeapon: null
    };
    console.log(DefaultWeapons);
  };

  submitAction(key) {

  }

  onChange(event) {
    var field = event.target.name;
    var value = event.target.value;

    this.setState({ [field]: value });
  }

  layoutWeapons() {
    var keys = Object.keys(DefaultWeapons);
    var selectObjectData = {}
    keys.map((key) => {
      var weaponData = DefaultWeapons[key];
      var damageItem = weaponData.damage[0]
      //console.log(key, weaponData);
      selectObjectData[key] = `${key}: ${damageItem.flatDamage || ""} ${damageItem.diceExpression? `(${damageItem.diceExpression})` : ""} ${damageItem.dmgType || ""}`
    })

    return (
      <SelectField
        name="weapon"
        objectData={selectObjectData}
        stateValue={this.state.existingWeapon || ""}
        placeholder="Select Existing Weapon"
        style={{ width: "100%" }}
        onChange={(event) => {
          this.setState({ ...this.state, existingWeapon: event.target.value });
        }}
      />
    );
  }

  render() {
    return (
      <div>
        <label className="has-float-label" style={{ width: "100%" }}>
          {this.layoutWeapons()}
          <span>Use Existing Weapon</span>
        </label>

        <InputGroup style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
          <label className="has-float-label" style={{ display: "table-cell" }}>
            <FormControl
              type="text"
              name="range"
              value={this.state.range || ""}
              placeholder="5ft or 20/180ft"
              onChange={(event) => { this.onChange(event) }}
              style={{ borderRadius: "4px 0px 0px 4px" }}
            />
            <span style={{ textOverflow: "ellipsis" }}>Range</span>
          </label>
          <label className="has-float-label" style={{ display: "table-cell" }}>
            <FormControl
              type="number"
              name="targets"
              value={this.state.targets || ""}
              placeholder="#"
              onChange={(event) => { this.onChange(event) }}
              style={{ borderRadius: "0px 0px 0px 0px" }}
            />
            <span># Targets</span>
          </label>
          <label className="has-float-label" style={{ display: "table-cell", width: "45%"}}>
            <SelectField
              name="weaponSize"
              objectData={{ "medium": "Medium (x1 DMG Dice)", "large": "Large (x2 DMG Dice)", "huge": "Huge (x3 DMG Dice)", "gargantuan": "Gargantuan (x4 DMG Dice)" }}
              stateValue={this.state.weaponSize || "medium"}
              placeholder="Weapon Size"
              style={{borderRadius:"0px 4px 4px 0px"}}
              onChange={(event) => { this.onChange(event) }}
            />
            <span>Weapon Size</span>
          </label>
        </InputGroup>

        <div className="hr-label">or</div>

        <div>Create an Action!</div>

        <Button bsStyle="success" onClick={() => { }}><Glyphicon glyph="plus" /> Add</Button>
      </div>
    );
  }
}

export default WeaponAction;