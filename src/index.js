import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

import { Counter } from './features/counter/Counter';
import { Uploader } from './features/uploader/Uploader';
import { Editor } from './features/editor/Editor';
import { Preview } from './features/preview/Preview';
import { Export } from './features/export/Export';
import * as serviceWorker from './serviceWorker';

import 'fontsource-roboto';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path='/' component={App}></Route>
              <Route exact path='/counter' component={Counter}></Route>
              <Route exact path='/uploader' component={Uploader}></Route>
              <Route exact path='/editor' component={Editor}></Route>
              <Route exact path='/preview' component={Preview}></Route>
              <Route exact path='/export' component={Export}></Route>
            </Switch>
          </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();