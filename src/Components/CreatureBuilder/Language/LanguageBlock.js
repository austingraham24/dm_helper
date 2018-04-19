import React, {Component} from 'react';
import {PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Button, Glyphicon} from "react-bootstrap";
//import MovementItem from "./MovementItem";
//import MovementForm from './MovementForm';

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
        let newMovementItems = [...this.state.movementItems];
        if(action === "delete" && index != null) {
            newMovementItems.splice(index, 1);
        }
        else if(action === "add" && newData != null) {
            newMovementItems.push(newData);
        }
        else if(action === "update" && index!=null && newData != null) {
            newMovementItems.splice(index, 1, newData);
        }
        if(action === "update" || (newMovementItems.length !== this.state.movementItems.length)){
            this.setState({movementItems:newMovementItems});
        }
    }

    layoutExistingItemsForms() {
        return (
            this.state.languages.map((item, index) => {
                return null;//return <MovementForm key={index} index={index} type={item.type} speed={item.speed} hover={item.hover} submitChanges={this.handleChange.bind(this)}/>
            })
        );
    }

    setUpLanguages() {
        if(this.state.isEditing) {
            return (
                <React.Fragment>
                    {this.layoutExistingItemsForms()}
                    {/* <MovementForm submitChanges={this.handleChange.bind(this)}/> */}
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