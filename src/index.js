import { render } from "react-dom"
import React from "react"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"

import './app.css'

import App from "./Containers/App"
import store , { history } from "./Store/configureStore"

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)