import React, { Component } from 'react';
import './App.css';
import Banner from './Components/Banner';
import CreatureBuilder from './Components/CreatureBuilder'

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div>
        <Banner />
        <CreatureBuilder />
      </div>
    );
  }
}

export default App;
