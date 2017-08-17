import React from 'react'
import { Button, FormControl, TextField, FormGroup } from "material-ui"
import { withStyles } from "material-ui"

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: 240,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
})

const LoginForm = (props) => {
    var credentials = {}
    const handleUsernameChange = (event) =>{        
        credentials = {
            ...credentials,
            username : event.target.value
        }
    }

    const handlePasswordChange = (event) =>{
        credentials={
            ...credentials,
            password : event.target.value
        }
    }

    const handleSubmit = (event) =>{
        event.preventDefault()        
        props.submitAction(credentials)
    }
    const classes = props.classes
    return (

        <FormControl
            fullWidth={true}>
            <FormGroup>
                <TextField
                    id="username"
                    label="username"
                    className={classes.textField}
                    onChange={handleUsernameChange.bind(this)}
                />
                <TextField
                    id="password"
                    label="password"
                    type="password"
                    className={classes.textField}
                    margin="normal"
                    onChange={handlePasswordChange.bind(this)}
                />
            </FormGroup>
            <FormGroup>
                <Button
                    raised color="primary" className={classes.button}
                    onClick={handleSubmit.bind(this)}>
                    Login
                </Button>
            </FormGroup>
        </FormControl >

    )
}


export default withStyles(styles)(LoginForm)