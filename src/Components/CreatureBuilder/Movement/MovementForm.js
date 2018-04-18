import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import "./style.css";
import _ from "lodash";

class MovementForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            speed: this.props.speed || "",
            type: this.props.type || "",
            hover: this.props.hover || false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        this.debouncedSubmit("update")
    }

    onChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        if(name === "hover") {
            value = event.target.checked;
        }
        this.setState({[name]:value});
    }

    buttonClick(event) {
        let action = event.target.name
        if (action === "deleteButton") {
            this.submitChanges("delete");
        }
        else if(action === "addButton") {
            this.submitChanges("add");
        }
    }

    submitChanges(action) {
        if (action === "delete") {
            this.props.submitChanges("delete", this.props.index);
        }
        else {
            let speed = this.state.speed;
            let type = this.state.type;
            let hover = this.state.hover;
            if((speed || speed === "0") && type) {
                this.props.submitChanges(action, this.props.index, {"type":type, "speed":speed, "hover":hover});
                if(action === "add"){
                    this.setState({
                        speed: "",
                        type: "",
                        hover: false
                    });
                }
            }
        }
    }

    getSubmitButton() {
        if(this.props.type) {
            return <Button bsStyle="danger" onClick={this.buttonClick.bind(this)} name="deleteButton">Delete</Button>
        }
        return <Button bsStyle="default" onClick={this.buttonClick.bind(this)} name="addButton">Add</Button>
    }

    render() {
        return (
            <Col xs={12} className="form-col">
                <Col xs={4} className="movement-form-col">
                    <FormControl
                        type="text"
                        name = "type"
                        value={this.state.type}
                        placeholder="Walking"
                        onChange={this.onChange.bind(this)}
                    />
                </Col>
                <Col xs={3} className="movement-form-col">
                    <InputGroup>
                        <FormControl
                            type="text"
                            name = "speed"
                            value={this.state.speed}
                            placeholder="30"
                            onChange={this.onChange.bind(this)}
                        />
                        <InputGroup.Addon>ft</InputGroup.Addon>
                    </InputGroup>
                </Col>
                <Col xs={2} className="movement-form-col">
                    <Checkbox checked={this.state.hover} name="hover" onChange={this.onChange.bind(this)} bsClass="checkbox" className="movement-input">(Hover)</Checkbox>
                </Col>
                <Col xs={3}>
                    {this.getSubmitButton()}
                </Col>
            </Col>
        );
    }
}

export default MovementForm;