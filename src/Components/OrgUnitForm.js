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


export const OrgUnitForm = ({counties, constituencies }) => {
    const handleCountyChanged = (event) => {

    }

    const handleConstituencyChanged = (event) => {

    }

    const classes = props.classes
    return (

        <FormControl
            fullWidth={true}
            >
            <FormGroup>
                <select
                    id="county"
                    label="county"
                    className={classes.textField}
                    onChange={handleCountyChanged.bind(this)}
                />
                <select
                    onChange={handleChange.bind(this)}
                    placeholder='select a county'>
                    {
                        counties.map((county, i) => (
                            <option
                                key={i}
                                value={county.id}>

                                {county.name}

                            </option>
                        ))
                    }
                </select>
                <select
                    id="password"
                    label="password"                    
                    className={classes.textField}
                    margin="normal"
                    onChange={handleConstituencyChanged.bind(this)}
                />
            </FormGroup>            
        </FormControl >
    )
}

export default withStyles(styles)(OrgUnitForm)



