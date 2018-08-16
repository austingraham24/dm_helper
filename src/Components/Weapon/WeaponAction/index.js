import React, { Component, Fragment } from 'react';
import "./weaponAction.css";
import { Panel, FormGroup, Well, ButtonToolbar, ToggleButtonGroup, ToggleButton, FormControl, Tabs, Tab, Checkbox, ControlLabel, Col, Glyphicon, InputGroup, DropdownButton, MenuItem, Popover, OverlayTrigger, Button } from "react-bootstrap";
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

    this.state = {
      existingWeapon: null,
      weaponSize: "medium"
    };
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
      selectObjectData[key] = `${key}: ${damageItem.flatDamage || ""} ${damageItem.diceExpression ? `(${damageItem.diceExpression})` : ""} ${damageItem.dmgType || ""}`
    })

    return (
      <SelectField
        name="weapon"
        objectData={selectObjectData}
        stateValue={this.state.existingWeapon || ""}
        placeholder="Weapon"
        style={{ borderRadius: "4px 0px 0px 4px" }}
        onChange={(event) => {
          this.setState({ ...this.state, existingWeapon: event.target.value });
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
            <div style={{marginBottom:"10px"}} key={index + "-" + damageItem.dmgType + "-" + damageItem.flatDamage}>
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
    return (
      <div style={{marginBottom:"10px"}}>
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
              onChange={(event) => { this.onChange(event) }}
            />
            <span>Size</span>
          </label>
        </InputGroup>

        <InputGroup style={{ width: "100%", margin: "10px 0px" }}>
          <InputGroup.Button>
            <Button bsStyle="success" style={{width:"100%"}} onClick={() => { }}><Glyphicon glyph="plus" /> Add Attack
            </Button>
          </InputGroup.Button>
          <InputGroup.Button>
            <Button bsStyle="primary" style={{width:"100%"}} onClick={() => { }}><Glyphicon glyph="cog" /> Weapon Creator
            </Button>
          </InputGroup.Button>
        </InputGroup>

        <div className="hr-label">or</div>

        <h5><b>Create New Action</b></h5>
        <FormGroup style={{ marginBottom: "10px" }}>
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

        <div style={{width: "100%", border: "2px solid #dbdbdb", borderWidth: "0px 0px 1px 0px", marginBottom:"10px"}} >
        <h5 style={{marginBottom:"0px"}}>Initial Damage</h5>
        </div>
        {this.getDamageForms()}

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

            <label className="has-float-label" style={{ marginBottom: "10px" }}>
              <FormControl
                componentClass="textarea"
                name="hitEffect"
                value={this.state.hitEffect || ""}
                placeholder="What happens when the action hits?"
                onChange={(event) => { this.onChange(event) }}
                style={{ borderRadius: "4px" }}
              />
              <span>Effect on Hit</span>
            </label>

            <label className="has-float-label" style={{ marginBottom: "10px" }}>
              <FormControl
                componentClass="textarea"
                name="saveEffect"
                value={this.state.saveEffect || ""}
                placeholder="What happens when the target succeeds a saving throw?"
                onChange={(event) => { this.onChange(event) }}
                style={{ borderRadius: "4px" }}
              />
              <span>Effect on Save</span>
            </label>
          </AnimateHeight>
        </div>

        <Button bsStyle="success" onClick={() => { this.props.onSubmit("create", this.state) }}><Glyphicon glyph="plus" /> Create</Button>
        <Button bsStyle="danger" style={{marginLeft:"10px"}} onClick={() => { this.props.onSubmit("delete", {}) }}><Glyphicon glyph="remove" /> Cancel</Button>

      </div>
    );
  }
}

export default WeaponAction;