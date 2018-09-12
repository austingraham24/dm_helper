import React, { Component } from 'react';
import './App.css';
import './normalize.css';
import {BrowserRouter} from 'react-router-dom';
import AppRouter from './AppRouter.js'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={this.props.store}>
        <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </Provider>
      </div>
    );
  }
}

export default App;
