import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './AppRouter.js'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
