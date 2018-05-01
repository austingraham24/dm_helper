import React, {Component} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";
import DamageForm from '../Damage/DamageForm';

class AbilityForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            name: this.props.name || "",
            desc: this.props.desc || "",
            damage: this.props.damage || []
        };
    }

    submitChanges(action) {
        // if (action === "delete") {
        //     this.props.submitChanges("delete", this.props.index);
        // }
        // else {
        //     let speed = this.state.speed;
        //     let type = this.state.type;
        //     let hover = this.state.hover;
        //     if((speed || speed === "0") && type) {
        //         this.props.submitChanges(action, this.props.index, {"type":type, "speed":speed, "hover":hover});
        //         if(action === "add"){
        //             this.setState({
        //                 speed: "",
        //                 type: "",
        //                 hover: false
        //             });
        //         }
        //     }
        // }
    }

    onChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        this.setState({[field]:value});
        //this.debouncedSubmit("update")
    }

    render() {
        return (
            <div style={{marginBottom:"15px"}}>
                <label className="has-float-label">
                <FormControl
                    bsSize="small"
                    type="text"
                    name = "name"
                    value={this.state.name || ""}
                    className="form-label-group ability-input"
                    placeholder="Put a cool name here..."
                    onChange={this.onChange.bind(this)}
                />
                <span>Ability Name</span>
                </label>
                <label className="has-float-label">
                <FormControl
                    bsSize="small"
                    componentClass="textarea"
                    className = "ability-description ability-input"
                    name = "desc"
                    value={this.state.desc || ""}
                    placeholder="What does it do?"
                    onChange={this.onChange.bind(this)}
                />
                <span>Ability Description</span>
                </label>
                <DamageForm />
            </div>
        );
    }
}

export default AbilityForm;