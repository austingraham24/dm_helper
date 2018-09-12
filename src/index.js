import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import Reducers from './ReducerIndex';
import './index.css';
import App from './App';
import StateLoader from "./ReduxStateLoader";
import { throttle } from "lodash";
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

const stateLoader = new StateLoader();
const store = createStore(Reducers, stateLoader.loadState(), applyMiddleware(thunk));

store.subscribe(throttle(() => {
  stateLoader.saveState(store.getState());
}, 1000));

ReactDOM.render(<App store={ store }/>, document.getElementById('root'));
registerServiceWorker();
