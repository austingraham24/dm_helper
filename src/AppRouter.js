import React, { Component } from 'react';
import Banner from './Components/Banner';
import Footer from './Components/Footer/Footer.js';
import {Route, Switch} from 'react-router-dom';
import CreatureBuilder from './Components/CreatureBuilder'
import Landing from './Components/Landing'
import NotFound from './404.js'

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Banner />
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/CreatureBuilder" component={CreatureBuilder}/>
          <Route component={NotFound} />
        </Switch>
        <div style={{minHeight:"75px"}}></div>
        <Footer />
      </div>
    );
  }
}

export default AppRouter;