import React, {Component, Fragment} from 'react';
import {Form, PageHeader, Panel, Clearfix, InputGroup, FormGroup, FormControl, ControlLabel, Row, Col, Checkbox, Button, Glyphicon} from "react-bootstrap";
import _ from "lodash";
import DamageForm from '../Damage/DamageForm';
import PanelButtonToggle from "../../PanelButtonToggle/PanelButtonToggle.js";

class AbilityForm extends Component {
    constructor(props) {
        super(props);

        this.debouncedSubmit = _.debounce(this.submitChanges, 500);
        
        this.state={
            name: this.props.name || "",
            desc: this.props.desc || "",
            damage: this.props.damage || [{flatDamage:"15", diceExpression:"2d12+2", dmgType:"Fire"}],
            dealsDamage: this.props.damage ? true : false
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

    getDamage() {
        if(this.state.dealsDamage){
            return (
                <Fragment>
                    {this.state.damage.map(
                        (damageItem) => {
                            return (
                                <DamageForm 
                                flatDamage = {damageItem.flatDamage}
                                diceExpression = {damageItem.diceExpression}
                                dmgType = {damageItem.dmgType}
                                />
                            );
                        }
                    )}
                    <DamageForm defaultEmpty/>
                </Fragment>
            );
        }
        else {
            return (
                <Button 
                    bsSize="xsmall"
                    onClick={() => {
                        this.setState({dealsDamage:true})
                    }}
                >
                    Add Damage
                </Button>
            );
        }
    }

    render() {
        console.log(this.state);
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
                {/* <PanelButtonToggle> */}
                    {this.getDamage()}
                {/* </PanelButtonToggle> */}
            </div>
        );
    }
}

export default AbilityForm;