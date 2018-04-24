import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, ButtonGroup, Button, Glyphicon} from "react-bootstrap";
import './style.css';
import LanguageForm from './LanguageForm.js';

class LanguageBlock extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.props.onSubmit || null
        this.validSizes = {"editing": 4, "default":3}

        this.state={
            isEditing: false,
            languages: this.props.languages || [],
            activeSize: this.validSizes.default
        };
    }

    toggleFormVisible(){
        let visible = !this.state.isEditing;
        let size = this.validSizes.default;
        if(visible) {
            size = this.validSizes.editing
        }
        else {
            if(this.onSubmit) {
                this.onSubmit("movement", this.state.movementItems);
            }
        }
        this.setState({...this.state, isEditing:visible, activeSize:size});
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
                        <Button className="languageButton" disabled>{item}</Button>
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

    getEditButton() {
        let style = "primary";
        let glyph = "wrench"
        if(this.state.isEditing) {
            style = "success";
            glyph = "floppy-save";
        }
        return (
            <Button 
                bsSize="xs" 
                bsStyle={style} 
                style={{"marginLeft":"5px"}}
                onClick={this.toggleFormVisible.bind(this)}
            >
                <Glyphicon glyph={glyph}/>
            </Button>
        );
    }

    render() {
        return (
            <Col xs={12} sm={6} md={this.state.activeSize} className="form-col">
                <FormGroup controlId="creatureMovement">
                    <ControlLabel>
                        Language: 
                        {this.getEditButton()}
                    </ControlLabel>
                    {this.setUpLanguages()}
                </FormGroup>
            </Col>
        );
    }
}

export default LanguageBlock;