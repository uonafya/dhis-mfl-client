import React, { Component } from "react"
import "babel-polyfill"
import { Link, Route } from "react-router"
import { HashRouter } from "react-router-dom"
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { red, purple } from 'material-ui/colors';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import CloseIcon from 'material-ui-icons/Close';

import Home from "./Home"
import FacilityResolutionPage from "./FacilityResolutionPage"

const styles = {
    root: {
        marginTop: 30,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
};

class App extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        event.preventDefault()
        window.location = "http://test.hiskenya.org/"
    }

    handleClick = (event) => {
        event.preventDefault()
        window.location = "/"
    }

    render() {

        const classes = this.props.classes;
        const { value } = this.state;
        const bull = <span className={classes.bullet} style={{ fontSize: "60%" }}>•</span>;

        return (
            <div>
                <AppBar style={{ backgroundColor: "#276696" }} position="static">
                    <Toolbar >
                        <Typography type="title" color="inherit" style={{ cursor: "pointer" }} className={classes.flex} onClick={this.handleClick}>
                            dhis<span style={{ color: "#7FC9FD" }}>2</span> {bull} kmhfl client
                        </Typography>
                        <BottomNavigation
                            value={value} onChange={this.handleChange}
                            style={{ color: "#fff", backgroundColor: "transparent", marginRight: -30 }}
                        >
                            <BottomNavigationButton style={{ color: "#fff" }} icon={<CloseIcon />} />
                        </BottomNavigation>
                    </Toolbar>
                </AppBar>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route path="/resolution" component={FacilityResolutionPage} />
                    </div>
                </HashRouter>
            </div>
        )
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);