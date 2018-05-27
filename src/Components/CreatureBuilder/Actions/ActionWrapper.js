import React, { Component, Fragment } from 'react';
import { Col, Button, ButtonGroup, Glyphicon, Table } from "react-bootstrap";
import ActionItem from './ActionItem';
import GenericButton from '../../GenericButton';
import ActionForm from './ActionForm';
import "./style.css";

class ActionWrapper extends Component {
	constructor(props) {
    super(props);

		this.state = {
			isEditing: this.props.newAction || false
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

  getFormComponent(action) {
    return (
      <div className="actionRow" style={{display:"block"}}>
        <div style={{marginTop:"10px"}}>
            <ActionForm name={action.name} desc={action.desc} damage={action.damage} onSubmit={this.submitChanges.bind(this)}/>
        </div>
      </div>
    );
  }

  getViewOnlyComponent(action) {
    return (
      <div className="actionRow">
        <div className="actionCell">
          <div style={{marginTop:"5px"}}>
            <ActionItem name={action.name} desc={action.desc} damage={action.damage}/>
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
    //if newAction prop is set, always keep the form open. There is a weird glitch where after mounting state becomes false even though it was never toggled
    if(this.props.newAction || this.state.isEditing) {
      return this.getFormComponent(this.props.action);
    }
    return this.getViewOnlyComponent(this.props.action);
  }

  render() {
    return (
      <div>
        {this.layoutItems()}
      </div>
    );
  }
}

export default ActionWrapper;