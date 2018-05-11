import React, { Fragment } from 'react';
import { Col, Button, Glyphicon, Table } from "react-bootstrap";
import AbilityItem from './AbilityItem';
import GenericButton from '../../GenericButton';
//import "./style.css";

const AbilityWrapper = (props) => {
  let abilities = props.abilities || [];
  console.log(abilities);
  
  function layoutTable() {
    return abilities.map((ability) => {
      return (
        <div className="abilityRow" key={ability.name}>
          <div className="abilityCell">
              <AbilityItem name={ability.name} desc={ability.desc} damage={ability.damage}/>
          </div>
          <div className="buttonCell">
            <div className="contentCenteredVertically">
              <GenericButton type="edit" onClick={() => {}}/>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      {layoutTable()}
    </div>
  );
}

export default AbilityWrapper;