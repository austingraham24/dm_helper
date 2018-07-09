import React, { Component } from 'react';
import "./style.css";
import CreatureStats from "../../Inf/CreatureStatChart.json";
import creatureSizes from "../../Inf/CreatureSize.json";
import DiceAverages from "../../Inf/DiceAverages.json";
import CreatureClassificationArray from "../../Inf/CreatureClassification.json";
import ReferenceStatTable from "./ReferenceStatTable/ReferenceStatTable.js";
import { PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button } from "react-bootstrap";
import TemplateSelect from "./TemplateSelect.js";
import AttributePanel from "./Attributes/AttributePanel";
import StatsPanel from "./StatsPanel/StatsPanel.js";
import DefenseBlock from "./DefenseBlock.js";
import OffenseBlock from "./OffenseBlock.js";
import AbilitiesBlock from "./Abilities/AbilitiesBlock.js";
import OverviewBlock from "./OverviewBlock";
import CalculationFunctions from "./CalculationFunctions";
import PropTypes from 'prop-types';
import _ from "lodash";

class CreatureBuilder extends Component {
  constructor(props) {
    super(props);
    this.isolatedFields = ["movement", "type", "name", "classification", "alignment", "experience"]; //these fields dont trigger a recalculation of CR
    this.state = {
      //form specific state vars
      templateCR: null,
      //creature specific state vars
      type: "",
      name: "",
      size: null,
      classification: null,
      alignment: "none",
      experience: null,
      proficiencyBonus: 0,
      challengeRating: 0,
      calculatedCR: 0,
      defenses: {
        defenseCR: 0,
        hp: 0,
        ac: 0,
        effectiveHP: 0,
        effectiveAC: 0,
        hitDice: null,
        immunities: [],
        resistances: [],
        vulnerabilities: []
      },
      offenses: {
        offenseCR: 0,
        saveDC: 0,
        attackBonus: 0,
        dpr: 0,
        actions: []//[{ name: "Breath", desc: "Breathe fire upon everything! Mwuahahahaha!", damage: [{ dmgType: "Fire", flatDamage: "50" }] }]
      },
      stats: {},
      languages: [{ value: "Common", "understandsOnly": false }],
      proficiencies: {},
      movement: [],
      abilities: []
    };
  };

  setTemplateCR() {
    if (!this.state.templateCR && this.state.templateCR!== "0") {
      return
    }

    let overwrite = window.confirm("This will overwrite all currently filled in fields. Are you sure you wish to continue?");
    if (!overwrite) {
      return
    }

    let template = this.state.templateCR;
    let CRData = CreatureStats[this.state.templateCR];
    let newState = {...this.state};
    //console.log(CRData);
    newState.challengeRating = this.state.templateCR;
    //made some educated guesses on some fields.
    let hitDice = "d8"
    let health = parseInt(CRData.hp.split("-")[0], 10);
    let diceAverage = DiceAverages[hitDice];
    let diceCount = Math.floor(health / diceAverage);
    let bonus = Math.ceil(health % diceAverage);
    newState.defenses = {...newState.defenses, diceCount: diceCount, bonus: bonus, hitDice: hitDice, ac: CRData.ac};
    let baseDamage = parseInt(CRData.dpr.split("-"[0]), 10);
    let basicAction = { name: "Breath", desc: "Breathe fire upon everything! Mwuahahahaha!", damage: [{ dmgType: "Fire", flatDamage: baseDamage }] }
    newState.offenses = {...newState.offenses, attackBonus: CRData.attackBonus, saveDC: CRData.saveDC, dpr: baseDamage, actions: [basicAction]};
    this.precalculateFormChanges(newState);
  }

  handleChange = (field, value) => {
    let newState = { ...this.state };
    if (_.isPlainObject(value)) {
      let newFieldValues = { ...value };
      var newFieldState = { ...newState[field], ...newFieldValues };
      newState[field] = newFieldState;
    }
    else {
      newState[field] = value;
    }
    //console.log(newState);
    //check to see if the field should trigger a recalculation of CR
    if (this.isolatedFields.includes(field)) {
      this.setState({ ...newState });
      return
    }
    this.precalculateFormChanges(newState);
  }

  //method that will actually end up updating state; runs all calculations to get updated values before updating state
  //ex: EffectiveHP and defesive CR is influenced by other parts of the form so this does a pre-screen before changing state
  precalculateFormChanges(dataObject) {
    let newState = dataObject;
    newState.defenses["hp"] = this.calcHP(newState);
    if (!newState.defenses.hitDice) {
      newState.defenses.hitDice = creatureSizes[newState.size] || null;
    }
    newState = CalculationFunctions.calculateFinalCR(newState);
    //console.log(newState);
    this.setState({ ...newState });
  }

  calcHP(dataObject) {
    let hp = 0;
    let constMod = dataObject.stats["Constitution"] ? dataObject.stats["Constitution"].mod : 0
    if (dataObject.defenses.diceCount != null && dataObject.defenses.hitDice) {
      hp += dataObject.defenses.diceCount * DiceAverages[dataObject.defenses.hitDice];
      hp += (dataObject.defenses.diceCount * constMod);
      hp += eval(dataObject.defenses.bonus) || 0;
    }
    return Math.ceil(hp);
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <PageHeader>Creature Builder & CR Calculator</PageHeader>
        <Row className="formRow">
          <FormGroup controlId="templateOptions">
            <Col md={12}>
              <ControlLabel>View Quick Stats for CR:</ControlLabel>
              <TemplateSelect
                currentValue={this.state.templateCR}
                Options={CalculationFunctions.crKeys}
                callback={(event) => {
                  let value = event.target.value || null
                  this.setState({ templateCR: value });
                }}
              />
              <ReferenceStatTable CR={this.state.templateCR} crData={CreatureStats[this.state.templateCR] || null} setTemplateCR={() => {this.setTemplateCR()}}/>
            </Col>
          </FormGroup>
        </Row>
        {/*Creature Overview Panel*/}
        <Row>
          <Col sm={12}>
            <OverviewBlock state={{ ...this.state }} handleChange={this.handleChange} CRKeys={CalculationFunctions.crKeys} />
          </Col>
          <Col sm={12}>
            <StatsPanel onSubmit={this.handleChange} />
          </Col>
          <Col sm={12} md={6}>
            <AttributePanel languages={this.state.languages} movement={this.state.movement} onSubmit={this.handleChange} />
          </Col>
          <Col xs={12} md={6}>
            <AbilitiesBlock />
          </Col>
          <Clearfix />
          {/*Creature Offenses Panel*/}
          <Col xs={12} sm={6}>
            <OffenseBlock handleChange={this.handleChange} offenseProps={this.state.offenses} />
          </Col>
          {/*Creature Defenses Panel*/}
          <Col xs={12} sm={6}>
            <DefenseBlock handleChange={this.handleChange} defenseProps={{ ...this.state.defenses, constitution: this.state.stats["Constitution"] || null }} />
          </Col>
        </Row>
      </div >
    );
  }
}

export default CreatureBuilder;