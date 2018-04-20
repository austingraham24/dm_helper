import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, ButtonGroup, Button, Glyphicon} from "react-bootstrap";
//import MovementItem from "./MovementItem";
import LanguageForm from './LanguageForm.js';

class LanguageBlock extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.props.onSubmit || null

        this.state={
            isEditing: false,
            languages: this.props.languages || [],
            toggleLabel: "Edit Languages"
        };
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        let label = "Edit Movment";
        if(visible) {
            label = "Save Changes"
        }
        else {
            if(this.onSubmit) {
                this.onSubmit("movement", this.state.movementItems);
            }
        }
        this.setState({...this.state, isEditing:visible, toggleLabel: label});
    }

    handleChange(action, index = null, newData = null) {
        let newLanguages = [...this.state.languages];
        if(action === "delete" && index != null) {
            newLanguages.splice(index, 1);
        }
        else if(action === "add" && newData != null) {
            newLanguages.push(newData);
        }
        else if(action === "update" && index!=null && newData != null) {
            newLanguages.splice(index, 1, newData);
        }
        if(action === "update" || (newLanguages.length !== this.state.languages.length)){
            this.setState({languages:newLanguages});
        }
    }

    layoutExistingItemsForms() {
        return (
            this.state.languages.map((item, index) => {
                return (
                    <ButtonGroup key={index} bsSize="xsmall">
                        <Button>{item}</Button>
                        <Button bsStyle="danger" onClick={(event) => {this.handleChange("delete", index)}}><Glyphicon glyph="minus"/></Button>
                    </ButtonGroup>
                );
            })
        );
    }

    setUpLanguages() {
        if(this.state.isEditing) {
            return (
                <React.Fragment>
                    <div>{this.layoutExistingItemsForms()}</div>
                    <LanguageForm submitChanges={this.handleChange.bind(this)}/>
                </React.Fragment>
            );
        }
        let languageString = "";
            this.state.languages.map((item, index) => {
                if(index === 0) {
                    languageString += item;
                }
                else {
                    languageString += ", "+item;
                }
            })
        return <div>{languageString}</div>
    }

    render() {
        return (
            <Col xs={12} md={6} className="form-col">
                <FormGroup controlId="creatureMovement">
                    <Col xs={12}className="form-col">
                        <ControlLabel>Language:</ControlLabel>
                        {this.setUpLanguages()}

                        <Row>
                            <Col xs={12}>
                                <Button bsStyle="primary" bsSize="xsmall" onClick={this.toggleFormVisible.bind(this)}>{this.state.toggleLabel}</Button>
                            </Col>
                        </Row>
                    </Col>
                </FormGroup>
            </Col>
        );
    }
}

export default LanguageBlock;