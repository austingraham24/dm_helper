import React, { Fragment } from 'react';
import {Col, Button, Glyphicon} from "react-bootstrap";

const AbilityItem = (props) => {
    let name = props.name;
    let desc = props.desc;
    let damage = props.damage;
    function layoutDamage() {
      if(!damage) {
        return
      }
      let damageValues = damage.map((damageItem, index) => {
        if(!damageItem.flatDamage && !damageItem.diceExpression) {
          return
        }

        let expression =  damageItem.diceExpression;
        let damageString = "";
        let divider = (index > 0)? " + ": null;
        if(!expression) {
          damageString += damageItem.flatDamage + " " + damageItem.dmgType;
        }
        else {
          damageString += damageItem.diceExpression + " ("+damageItem.flatDamage + ") " + damageItem.dmgType;
        }
        return (
          <Fragment key={damageItem.dmgType + "-" + damageItem.flatDamage}>
            {divider}
            <Button 
              bsSize="xsmall" 
              className={damageItem.dmgType.toLowerCase() + " damageType-token"}
              key={damageItem.dmgType + "-" + damageItem.flatDamage}
            >
              {damageString}
            </Button>
          </Fragment>
        );
      });

      return (
        <div>
          <b>Damage: </b>
          {damageValues}
        </div>
      );
    }

    return (
        <div style={{marginBottom:"5px"}}>
            <b>{name}:</b>
            <div>
                {desc}
            </div>
            <div>
            {layoutDamage()}
            </div>
        </div>
    );
}

export default AbilityItem;