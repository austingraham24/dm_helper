import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Alert, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreatureBuilderActions from '../CreatureBuilder/CreatureBuilderActions';

const Landing = (props) => {

  function layoutCreatures() {
    // console.log(props.creatureList);
    if (props.creatureList) {
      return props.creatureList.map((entry, index) => {
        // console.log(entry, index);
        return (
          <div style={{display: "inline-block", marginRight:"10px", paddingLeft: "5px", borderLeft: "1px solid black"}}>
            <div>{entry.type} {entry.name? "("+entry.name+")":null} CR: {entry.challengeRating}</div>
            <Button bsSize="xsmall"
            onClick={() => {
              props.edit(entry, index);
            }}
            >Edit</Button>
            <Button bsSize="xsmall" bsStyle="danger"
            onClick={() => {
              props.deleteCreature(index);
            }}
            >Delete</Button>
          </div>
        );
      });
    }
    return null
  }

  return (
    <div className="container">
      <Alert bsStyle="warning">
        <div style={{textAlign:"center"}}>
          <Glyphicon glyph="alert" /> <strong>This site is still under construction, but please explore the various pages and features!</strong> <Glyphicon glyph="alert" />
        </div>
      </Alert>
      <h1>Welcome to the DM Helper Application!</h1>
      <h3>Current Feature: Creature Builder!</h3>
      <p>The current work is around the creature builder and CR Rating calculator. You can fill out data on a specific creature
        and the form will auto-calculate certain elements for the user.
      </p>
      <p>
        This will be integrated into more complex flows like campaign managers and encounter builders.
      </p>
      <LinkContainer to="/CreatureBuilder">
        <Button bsStyle="primary">Build-A-Creature!</Button>
      </LinkContainer>

      <div style={{marginTop:"10px"}}>
        Saved Creatures:<br/>
        {layoutCreatures()}
      </div>

      <h3>Project Details</h3>
      <p>You can find out more about the project at the <a href="https://github.com/austingraham24/dm_helper" target="_blank">github repo</a>. There
      you will find readme files, descriptions of the project, and the source code.</p>
      <p>You can also look also look at the status of the project and current state of features and work by viewing
        the <a href="https://github.com/austingraham24/dm_helper/projects/1" target="_blank">project</a> page.</p>
      <p>If you find a problem with the site, please file an <a href="https://github.com/austingraham24/dm_helper/issues" target="_blank">issue</a> so I can fix it!</p>
    </div>
  );
};

function mapStateToProps(State) {
  return {
    activeCreature: State.activeCreature || null,
    creatureList: State.creatureList || null
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    edit: CreatureBuilderActions.edit,
    clear: CreatureBuilderActions.clear,
    deleteCreature: CreatureBuilderActions.deleteCreature
  }, dispatch);
}

//export default CreatureBuilder;
export default connect(mapStateToProps, mapDispatchToProps)(Landing);