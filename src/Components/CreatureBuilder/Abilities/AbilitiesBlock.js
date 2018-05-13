import React, { Component, Fragment } from 'react';
import { PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon } from "react-bootstrap";
import UtilityPanel from "../../UtilityPanel";
import AbilityForm from "./AbilityForm.js";
import AbilityWrapper from "./AbilityWrapper.js";
import GenericButton from "../../GenericButton.js";
import "./style.css";
import "../../../Inf/Damage/DamageStyles.css";

class AbilitiesBlock extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = (this.props.onSubmit || null);
    this.defaultLabel = "Edit";
    this.editingLabel = "Save";
    this.defaultButtonStyle = "primary";
    this.editingButtonStyle = "success";
    this.defaultGlyph = "wrench";
    this.editingGlyph = "floppy-save"

    let abilities = this.props.abilities;// || [
    //   { name: "Sample1", desc: "This is a sample description. sadfadsfdf.fa dfa.dfg fdgdsfg sg.gsdg sfdgfds.g fdg dfs.g fdsg fd.gsf ddfg dshsgdh .sfgh gsf.gh sgfh.gh. fg.gh .", damage: [{ flatDamage: "15", diceExpression: "2d12+2", dmgType: "Poison" }, { flatDamage: "5", dmgType: "Necrotic" }] },
    //   { name: "Sample2", desc: "This is a sample2 description" },
    //   { name: "Sample3", desc: "This is a sample3 description" }
    // ];
    //ability object:
    //{name:"", desc:"", damage: null} -> no damage
    //name:"", desc:"", damage: [damageType]} -> does damage; affects offensive CR

    //damageType:
    //{type:"", avg: Int, dice: "1d12"}

    this.state = {
      abilityObjects: abilities,
    };
  }

  updateAbilities(action, index, object) {
    let abilities = [];
    if(this.state.abilityObjects) {
      abilities = [...this.state.abilityObjects];
    }
    console.log(abilities);
    switch (action) {
      case "create":
        abilities.push({empty:true});
        break;
      case "update":
        abilities.splice(index,1,object);
        break;
      case "delete":
        abilities.splice(index,1);
        break;
    }
    this.setState({abilityObjects: abilities});
  }

  layoutPanelBody() {
    if(!this.state.abilityObjects) {
      return
    }
    return this.state.abilityObjects.map((ability, index) => {
      if(ability.empty) {
        return (
          <AbilityWrapper 
            key={"emptyForm"} 
            ability={ability} 
            index={index} 
            onSubmit={this.updateAbilities.bind(this)} 
            defaultEditing/>
        );
      }
      return (
        <AbilityWrapper 
          key={ability.name} 
          ability={ability} 
          index={index} 
          onSubmit={this.updateAbilities.bind(this)}/>
      );
    });
  }

  render() {
    return (
      <Col xs={12} sm={6}>
        <FormGroup controlId="abilities">
          <UtilityPanel title={"Traits and Abilities"} collapsible defaultOpened>
            {this.layoutPanelBody()}
            <div style={{marginTop: "10px", marginBottom: "10px"}}>
              <Button bsSize={"xsmall"} bsStyle="primary" onClick={() => {
                this.updateAbilities("create", null, null);
              }}>
                <Glyphicon glyph="plus"/ > Add a Trait / Ability
              </Button>
            </div>
          </UtilityPanel>
        </FormGroup>
      </Col>
    );
  }
}

export default AbilitiesBlock;