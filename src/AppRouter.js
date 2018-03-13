import React, { Component } from 'react';
import Banner from './Components/Banner';
import {Route, Switch} from 'react-router-dom';
import CreatureBuilder from './Components/CreatureBuilder'
import Landing from './Components/Landing'

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/CreatureBuilder" component={CreatureBuilder}/>
        </Switch>
      </div>
    );
  }
}

export default AppRouter;