import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import "./style.css";

class MovementForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            visible: false,
            speed: "",
            type: "",
            onSubmit: this.props.onSubmit
        };
    }

    render() {
        return (
            <Col xs={12} className="form-col" className="movement-form">
                <Form horizontal>
                    <Col xs={4} className="movement-form-col">
                        <FormGroup controlId="movement-type" validationState={null} className="movement">
                        <FormControl
                            type="text"
                            name = "movement-form"
                            value={this.state.name}
                            placeholder="Walking"
                            onChange={this.state.onSubmit.bind(this)}
                            validationState=""
                        />
                        </FormGroup>
                    </Col>
                    <Col xs={2} className="movement-form-col">
                        <FormGroup controlId="movement-speed" validationState={null} className="movement">
                            <FormControl
                                type="text"
                                name = "movement-form"
                                value={this.state.name}
                                placeholder="30ft"
                                onChange={this.state.onSubmit.bind(this)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={2} className="movement-form-col">
                        <FormGroup controlId="movement-hover" validationState={null} className="movement">
                            <Checkbox checked={false} name="hover" onChange={()=>{}} bsClass="checkbox" className="movement-input">(Hover)</Checkbox>
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <Button><Glyphicon glyph="plus"/> Add</Button>
                    </Col>
                </Form>
            </Col>
        );
    }
}

export default MovementForm;