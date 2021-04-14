import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { Editor } from './features/editor/Editor';
import { Preview } from './features/preview/Preview';
import { Export } from './features/export/Export';
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path='/' component={App}></Route>
              <Route exact path='/editor' component={Editor}></Route>
              <Route exact path='/preview' component={Preview}></Route>
              <Route exact path='/export' component={Export}></Route>
            </Switch>
          </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();