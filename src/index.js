import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'

import reducers from './reducer'

import './index.css';
import TodoList from './components/dashboard'
import EditPage from './components/edit'
import * as serviceWorker from './serviceWorker';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Route path='/' exact component={TodoList}></Route>
            <Route path='/edit' component={EditPage}></Route>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
