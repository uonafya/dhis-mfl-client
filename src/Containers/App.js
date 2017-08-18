import React, { Component } from "react"
import "babel-polyfill"
import { Link, Route } from "react-router"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import Home from "./Home"
import LoginPage from "./LoginPage"
import Header from "../Components/Header"
import FacilitiesPage from "./FacilitiesPage"
import FacilityResolutionPage from "./FacilityResolutionPage"

export default class App extends Component {
    render() {
        return (
            <div>
                <Header title={"DHIS2 CLIENT"} />
                <Route exact path="/" component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/facilities" component={FacilitiesPage}/>
                <Route path="/resolution" component={FacilityResolutionPage}/>
            </div>
        )
    }
}