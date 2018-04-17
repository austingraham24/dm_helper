import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import "./style.css";

class MovementForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.speed);
        this.state={
            speed: this.props.speed || "",
            type: this.props.type || "",
            hover: this.props.hover || false,
        };
        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        this.submitChanges()
    }

    onChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        if(name === "hover") {
            value = event.target.checked;
        }
        this.setState({[name]:value});
    }

    submitChanges() {
        let speed = this.state.speed;
        let type = this.state.type;
        let hover = this.state.hover;
        if((speed || speed === "0") && type) {
            this.props.submitChanges({"type":type, "speed":speed, "hover":hover});
        }
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
                <Col xs={2} className="movement-form-col">
                    <FormControl
                        type="text"
                        name = "speed"
                        value={this.state.speed}
                        placeholder="30ft"
                        onChange={this.onChange.bind(this)}
                    />
                </Col>
                <Col xs={2} className="movement-form-col">
                    <Checkbox checked={this.state.hover} name="hover" onChange={this.onChange.bind(this)} bsClass="checkbox" className="movement-input">(Hover)</Checkbox>
                </Col>
                <Col xs={4}>
                    <Button>Save</Button>
                </Col>
            </Col>
        );
    }
}

export default MovementForm;