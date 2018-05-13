import React, { Component, Fragment } from 'react';
import { Col, Button, ButtonGroup, Glyphicon, Table } from "react-bootstrap";
import AbilityItem from './AbilityItem';
import GenericButton from '../../GenericButton';
import AbilityForm from './AbilityForm';
//import "./style.css";

class AbilityWrapper extends Component {
	constructor(props) {
    super(props);

		this.state = {
			isEditing: this.props.defaultEditing || false
		};
  }

  toggleEditing() {
    let editing = !this.state.isEditing;
    this.setState({isEditing: editing}, () => {
      if(!editing) {
        this.submitChanges()
      }
    })
  }

  submitChanges(action, object) {
    if(!this.props.onSubmit) {
      return null;
    }
    this.setState({isEditing:false}, () => {
      this.props.onSubmit(action, this.props.index, object)
    });
  }

  getFormComponent(ability) {
    return (
      <div className="abilityRow" style={{display:"block"}}>
        <div style={{marginTop:"10px"}}>
            <AbilityForm name={ability.name} desc={ability.desc} damage={ability.damage} onSubmit={this.submitChanges.bind(this)}/>
        </div>
      </div>
    );
  }

  getViewOnlyComponent(ability) {
    return (
      <div className="abilityRow">
        <div className="abilityCell">
          <div style={{marginTop:"5px"}}>
            <AbilityItem name={ability.name} desc={ability.desc} damage={ability.damage}/>
          </div>
        </div>
        <div className="buttonCell">
          <div className="contentCenteredVertically">
            <GenericButton type="edit" onClick={() => {this.toggleEditing()}}/>
            <GenericButton style={{marginTop:"5px"}} type="delete" onClick={() => {this.submitChanges("delete", null)}}/>
          </div>
        </div>
      </div>
    );
  }

  layoutItems() {
    if(this.state.isEditing) {
      return this.getFormComponent(this.props.ability);
    }
    return this.getViewOnlyComponent(this.props.ability);
  }

  render() {
    return (
      <div>
        {this.layoutItems()}
      </div>
    );
  }
}

export default AbilityWrapper;