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


export const OrgUnitForm = (props) => {
    const handleCountyChanged = (event) => {
        props.getConstituencies(event.target.value)
    }

    const handleConstituencyChanged = (event) => {
        props.getWards(event.target.value)
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
                    placeholder='select a county'>
                    {
                        props.counties.map((county, i) => (
                            <option
                                key={i}
                                value={county.id}>
                                {county.name}
                            </option>
                        ))
                    }
                </select>
                {
                    props.constituenciesIsFetched ? (
                        <select
                            id="password"
                            label="password"
                            className={classes.textField}
                            onChange={handleConstituencyChanged.bind(this)}>
                            {
                                props.constituencies.map((constituency, i) =>(
                                    <option
                                        key={i}
                                        value={constituency.id}>
                                        {constituency.name}
                                    </option>
                                ))
                            }
                        </select>

                    ) : (
                        <h4>Loading</h4>
                    )
                }
            </FormGroup>
        </FormControl >
    )
}

export default withStyles(styles)(OrgUnitForm)



