import React, { Component, Fragment } from 'react';
import "./weaponAction.css";
import { Panel, FormGroup, Well, ButtonToolbar, ButtonGroup, ToggleButtonGroup, ToggleButton, FormControl, Tabs, Tab, Checkbox, ControlLabel, Col, Glyphicon, InputGroup, DropdownButton, MenuItem, Popover, OverlayTrigger, Button } from "react-bootstrap";
import UtilityPanel from "../../UtilityPanel";
import PropTypes from 'prop-types';
import DiceAverages from "../../../Inf/DiceAverages.json";
import DefaultWeapons from "../../../Inf/Weapons.json";
import _ from "lodash";
import SelectField from "../../SelectField";
import Stats from "../../../Inf/Stats.json";
import AnimateHeight from 'react-animate-height';
import DamageForm from "../../CreatureBuilder/Damage/DamageForm";

class WeaponAction extends Component {
  constructor(props) {
    super(props);

    this.weaponSizes = { "medium": { label: "Medium (x1 DMG Dice)", multiplier: 1 }, "large": { label: "Large (x2 DMG Dice)", multiplier: 2 }, "huge": { label: "Huge (x3 DMG Dice)", multiplier: 3 }, "gargantuan": { label: "Gargantuan (x4 DMG Dice)", multiplier: 4 } }

    this.state = {
      existingWeapon: this.props.action.existingWeapon || null,
      weaponSize: this.props.action.weaponSize || "medium",
      name: this.props.action.name || null,
      desc: this.props.action.desc || null,
      damage: this.props.action.damage || null,
      range: this.props.action.range || null,
      attackType: this.props.action.attackType || null,
      damage: this.props.action.damage || null,
      targets: this.props.action.targets || 1,
      saveType: this.props.action.saveType
    };
  };

  submitAction(key) {
    //console.log(this.state);
    let damageObject = this.state;
    this.props.onSubmit(key, damageObject);
  }

  onFormCancel() {
    if (this.props.newAction) {
      this.props.onSubmit("delete", {})
    }
    else {
      this.props.onSubmit("cancel", {})
    }
  }

  prefillWeaponInfo(weapon) {
    if (!weapon) {
      return {}
    }
    let weaponName = weapon;
    let weaponData = {...DefaultWeapons[weaponName]};
    let actionObject = {
      name: weaponName,
      desc: weaponData.desc,
      attackType: weaponData.type,
      range: weaponData.range || (weaponData.properties.includes("reach") ? 10 : 5),
    }
    actionObject.damage = this.calculateWeaponDamage(weaponName);
    return actionObject;
  }

  calculateWeaponDamage(weapon) {
    if (!weapon) {
      return null;
    }

    let weaponData = {...DefaultWeapons[weapon]};
    weaponData.desc = "Hard Edit";
    let damageObject = {...weaponData.damage[0]};
    if (damageObject.dmgType) {
      let diceComponents = damageObject.diceExpression.split("d");
      let newDiceCount = parseInt(diceComponents[0]) * this.weaponSizes[this.state.weaponSize].multiplier
      damageObject.diceExpression = newDiceCount + "d" + diceComponents[1];
      let updatedAverage = Math.ceil((DiceAverages["d" + diceComponents[1]]) * newDiceCount);
      damageObject.flatDamage = updatedAverage;
      if (weaponData.damage.length > 1) {
        return [damageObject, weaponData.damage.slice(1)];
      }
      return [damageObject];
    }
    return null;
  }

  onChange(event, completion) {
    var field = event.target.name;
    var value = event.target.value;

    this.setState({ [field]: value }, () => {
      if(completion) {
        completion();
      }
    });
  }

  layoutWeapons() {
    var keys = Object.keys(DefaultWeapons);
    var selectObjectData = { "": "None" }
    keys.map((key) => {
      var weaponData = DefaultWeapons[key];
      var damageItem = weaponData.damage[0]
      //console.log(key, weaponData);
      selectObjectData[key] = `${key}: ${damageItem.flatDamage || ""} ${damageItem.diceExpression ? `(${damageItem.diceExpression})` : ""} ${damageItem.dmgType || ""}`
    })

    return (
      <SelectField
        name="existingWeapon"
        objectData={selectObjectData}
        stateValue={this.state.existingWeapon || ""}
        placeholder="Weapon"
        style={{ borderRadius: "4px 0px 0px 4px" }}
        onChange={(event) => {
          this.onChange(event, () => {
            let weaponInfo = this.prefillWeaponInfo(this.state.existingWeapon);
            this.setState({...weaponInfo});
          })
        }}
      />
    );
  }

  layoutDamageItems() {
    if (!this.state.damage) {
      return null
    }
    return (
      this.state.damage.map(
        (damageItem, index) => {
          return (
            <div style={{ marginBottom: "10px" }} key={index + "-" + damageItem.dmgType + "-" + damageItem.flatDamage}>
              <DamageForm
                flatDamage={damageItem.flatDamage}
                diceExpression={damageItem.diceExpression}
                dmgType={damageItem.dmgType}
                index={index}
                submitFunction={this.updateDamage.bind(this)}
              />
            </div>
          );
        })
    );
  }

  getDamageForms() {
    if (this.state.damage) {
      return (
        <Fragment>
          {this.layoutDamageItems()}
          <DamageForm key="empty" defaultEmpty submitFunction={this.updateDamage.bind(this)} />
        </Fragment>
      );
    }
    else {
      return (
        // <div style={{ marginBottom: "5px" }}>
        //   <Button bsSize="xsmall" bsStyle="primary" onClick={() => { this.setState({ damage: [] }) }}>Add Damage</Button>
        // </div>
        <DamageForm key="empty" defaultEmpty submitFunction={this.updateDamage.bind(this)} />
      );
    }
  }

  updateDamage(action, index, object) {
    let damage = this.state.damage ? [...this.state.damage] : [];
    switch (action) {
      case "add":
        damage.push(object);
        break;
      case "update":
        damage.splice(index, 1, object);
        break;
      case "delete":
        damage.splice(index, 1);
        break;
    }

    //set to null if damage no longer has elements
    if (damage.length === 0) {
      damage = null;
    }
    //only update state if we need to
    if (damage != this.state.damage) {
      this.setState({ damage: damage });
    }
  }

  render() {

    let buttonLabel = this.props.newAction ? "Create" : "Save";
    let glyph = this.props.newAction ? "plus" : "floppy-save"

    return (
      /* Existing Weapon Form*/
      <div style={{ marginBottom: "10px" }}>
        <h5><b>Use Existing Weapon</b></h5>
        <InputGroup style={{ width: "100%", margin: "10px 0px" }}>
          <label className="has-float-label" style={{ display: "table-cell" }}>
            {this.layoutWeapons()}
            <span>Weapon</span>
          </label>
          <label className="has-float-label" style={{ display: "table-cell", width: "45%" }}>
            <SelectField
              name="weaponSize"
              objectData={{ "medium": "Medium (x1 DMG Dice)", "large": "Large (x2 DMG Dice)", "huge": "Huge (x3 DMG Dice)", "gargantuan": "Gargantuan (x4 DMG Dice)" }}
              stateValue={this.state.weaponSize || "medium"}
              placeholder="Weapon Size"
              style={{ borderRadius: "0px 4px 4px 0px" }}
              onChange={(event) => { 
                this.onChange(event, () => {
                  let weaponInfo = this.prefillWeaponInfo(this.state.existingWeapon);
                  this.setState({ ...weaponInfo });
                });
              }}
            />
            <span>Size</span>
          </label>
        </InputGroup>

        <Button disabled bsStyle="primary" style={{ width: "100%", marginBottom:"10px"}} onClick={() => { }}>
          <Glyphicon glyph="cog" /> Weapon Creator Coming Soon!
        </Button>

        <div className="hr-divider" style={{width:"100%"}}/>

        {/* New Action Form */}

        {/* Name */}

        <FormGroup style={{ margin: "10px 0px" }}>
          <label className="has-float-label">
            <FormControl
              bsSize="small"
              type="text"
              name="name"
              value={this.state.name || ""}
              style={{ borderRadius: "4px" }}
              className="form-label-group"
              placeholder="Put a cool name here..."
              onChange={this.onChange.bind(this)}
            />
            <span>Action Name</span>
          </label>
        </FormGroup>
      
      {/* Description */}

        <FormGroup style={{ marginBottom: "10px" }}>
          <label className="has-float-label">
            <FormControl
              bsSize="small"
              componentClass="textarea"
              className="action-description"
              name="desc"
              value={this.state.desc || ""}
              style={{ borderRadius: "4px" }}
              placeholder="What does it do?"
              onChange={this.onChange.bind(this)}
            />
            <span>Action Description</span>
          </label>
        </FormGroup>

      {/* Attack Type & Range */}

        <InputGroup style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
          <label className="has-float-label" style={{ display: "table-cell", width: "50%" }}>
            <SelectField
              name="attackType"
              objectData={{ "na": " - ", "melee": "Melee", "ranged": "Ranged" }}
              stateValue={this.state.attackType || "na"}
              placeholder="Action Type"
              style={{ borderRadius: "4px 0px 0px 4px" }}
              onChange={(event) => { this.onChange(event) }}
            />
            <span>Attack Type</span>
          </label>
          <label className="has-float-label" style={{ display: "table-cell", width: "50%" }}>
            <FormControl
              type="text"
              name="range"
              value={this.state.range || ""}
              placeholder="5 or 20/180"
              onChange={(event) => { this.onChange(event) }}
              style={{ borderRadius: "0px 4px 4px 0px" }}
            />
            <span style={{ textOverflow: "ellipsis" }}>Range (Ft.)</span>
          </label>
        </InputGroup>

        {/* Damage */}

        <div style={{ width: "100%", border: "2px solid #dbdbdb", borderWidth: "0px 0px 1px 0px", marginBottom: "10px" }} >
          <h5 style={{ marginBottom: "0px" }}>Initial Damage</h5>
        </div>
        {this.getDamageForms()}

        {/* Additional Details */}

        <div style={{ marginBottom: "10px" }}>
          <div
            style={{ cursor: "pointer", width: "100%", border: "2px solid #dbdbdb", borderWidth: "0px 0px 1px 0px" }}
            onClick={() => { this.setState({ showAdditionalDetails: !this.state.showAdditionalDetails }) }}
          >
            <div style={{ width: 'calc(100% - 14px)', display: "inline-block" }}>
              <h5 style={{ marginBottom: "0px" }}>Additional Details</h5>
            </div>
            <div style={{ width: "14px", height: "14px", display: "inline-block" }}>
              <Glyphicon glyph={this.state.showAdditionalDetails ? "chevron-up" : "chevron-down"} />
            </div>
          </div>
          <AnimateHeight
            duration={500}
            height={this.state.showAdditionalDetails ? "auto" : 0}>

            {/* saveType */}

            <div style={{ marginTop: "10px", width: "47%", display: "inline-block" }}>
              <label className="has-float-label">
                <SelectField
                  name="saveType"
                  objectData={{ "": "None", ...Stats }}
                  stateValue={this.state.saveType || ""}
                  style={{ borderRadius: "4px" }}
                  onChange={(event) => { this.onChange(event) }}
                />
                <span>Save Type</span>
              </label>
            </div>

            {/* targets */}

            <div style={{ marginTop: "10px", marginLeft: "6%", width: "47%", display: "inline-block" }}>
              <label className="has-float-label">
                <FormControl
                  type="number"
                  name="targets"
                  value={this.state.targets || ""}
                  placeholder="#"
                  onChange={(event) => { this.onChange(event) }}
                  style={{ borderRadius: "4px" }}
                />
                <span># Targets</span>
              </label>
            </div>

            {/* areaEffect & aoeSize */}

            <InputGroup style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}>
              <label className="has-float-label" style={{ display: "table-cell", width: "60%" }}>
                <SelectField
                  name="areaEffect"
                  objectData={{ "": "-", "cone": "Cone", "cube": "Cube", "cylinder": "Cylinder", "line": "Line", "sphere": "Sphere", "square": "Square", "squareFeet": "Square Feet" }}
                  stateValue={this.state.areaEffect || ""}
                  style={{ borderRadius: "4px 0px 0px 4px" }}
                  onChange={(event) => { this.onChange(event) }}
                />
                <span>Area of Effect</span>
              </label>
              <label className="has-float-label" style={{ display: "table-cell", width: "40%" }}>
                <FormControl
                  type="number"
                  name="aoeSize"
                  value={this.state.aoeSize || ""}
                  placeholder="5"
                  onChange={(event) => { this.onChange(event) }}
                  style={{ borderRadius: "0px 4px 4px 0px" }}
                />
                <span style={{ textOverflow: "ellipsis" }}>Size(Ft.)</span>
              </label>
            </InputGroup>

            {/* Miss Effect */}

            <label className="has-float-label" style={{ marginBottom: "10px" }}>
              <FormControl
                componentClass="textarea"
                name="missEffect"
                value={this.state.missEffect || ""}
                placeholder="What happens when the action misses?"
                onChange={(event) => { this.onChange(event) }}
                style={{ borderRadius: "4px" }}
              />
              <span>Effect on Miss</span>
            </label>

            {/* Successful Save Effect */}

            <label className="has-float-label" style={{ marginBottom: "10px" }}>
              <FormControl
                componentClass="textarea"
                name="saveEffect"
                value={this.state.saveEffect || ""}
                placeholder="What happens when the target succeeds a saving throw?"
                onChange={(event) => { this.onChange(event) }}
                style={{ borderRadius: "4px" }}
              />
              <span>Effect on Save Success</span>
            </label>

            {/* Save Fail Effect */}

            <label className="has-float-label" style={{ marginBottom: "10px" }}>
              <FormControl
                componentClass="textarea"
                name="failEffect"
                value={this.state.failEffect || ""}
                placeholder="What happens when the target fails a save?"
                onChange={(event) => { this.onChange(event) }}
                style={{ borderRadius: "4px" }}
              />
              <span>Effect on Save Fail</span>
            </label>
          </AnimateHeight>
        </div>

        <Button bsStyle="success" onClick={() => { this.submitAction("update") }}><Glyphicon glyph={glyph} /> {buttonLabel}</Button>
        <Button bsStyle="danger" style={{ marginLeft: "10px" }} onClick={() => { this.onFormCancel() }}><Glyphicon glyph="remove" /> Cancel</Button>

      </div>
    );
  }
}

export default WeaponAction;