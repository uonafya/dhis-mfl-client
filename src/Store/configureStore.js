import {  createStore,  applyMiddleware } from 'redux'
import rootReducer from "./rootReducer"
import thunk from 'redux-thunk'
import createHistory from "history/createBrowserHistory"
import { routerMiddleware } from "react-router-redux"

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)

const store  = createStore(rootReducer, applyMiddleware(thunk, historyMiddleware))

export default store
