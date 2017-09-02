import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"

import './app.css'

import App from "./Containers/App"
import store, { history } from "./Store/configureStore"

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)