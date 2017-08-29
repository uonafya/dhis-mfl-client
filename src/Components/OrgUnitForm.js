import React from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from "material-ui"

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: "30px auto auto auto",
        maxWidth: 1200
      },
    card: {
      minWidth: 275,
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
    pos: {
      marginBottom: 12,
      color: theme.palette.text.secondary,
    },
    elonSelect: {
        width: "70%",
        height: 50,
        fontSize: "120%",
        border: "none",
        borderBottom: "solid 1px",
        outline: 0,
        marginBottom: 50
    },
})


export const OrgUnitForm = (props) => {
    const handleCountyChanged = (event) => {
        props.resetOrgUnitTypeFetched()
        props.getOrgUnit(event.target.value)
        props.getConstituencies(event.target.value)
    }

    const handleConstituencyChanged = (event) => {
        props.resetOrgUnitTypeFetched()
        props.getOrgUnit(event.target.value)
        props.getWards(event.target.value)
    }

    const handleWardChanged = (event) => {
        props.resetOrgUnitTypeFetched()
        props.getOrgUnit(event.target.value)
        props.getFacilities(event.target.value)
    }

    const classes = props.classes
    return (

        <div>
            <Typography type="body1" className={classes.title}>
                Select County
            </Typography>
            <select
                id="county"
                label="county"
                className={classes.elonSelect} 
                style={{borderColor: "#8c8888"}} 
                onChange={handleCountyChanged.bind(this)}
                placeholder='select a county'>
                { props.countiesIsFetched ? (<option defaultValue>No Selection Made</option>):("")}
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
            <Typography type="body1" className={classes.title}>
                Select Sub-County
            </Typography>
            <select
                id="password"
                label="password"
                className={classes.elonSelect} 
                style={{borderColor: "#8c8888"}} 
                onChange={handleConstituencyChanged.bind(this)}>
                { props.constituenciesIsFetched ? (<option defaultValue>No Selection Made</option>):("")}
                {
                    props.constituenciesIsFetched ? (
                        
                        props.constituencies.map((constituency, i) =>(
                            <option
                                key={i}
                                value={constituency.id}>
                                {constituency.name}
                            </option>
                        ))

                    ):(<option defaultValue>No Data Loaded</option>)
                }
            </select>
            <Typography type="body1" className={classes.title}>
                Select Ward
            </Typography>
            <select
                id="password"
                label="password"
                className={classes.elonSelect} 
                style={{borderColor: "#8c8888"}} 
                onChange={handleWardChanged.bind(this)}>
                { props.wardsIsFetched ? (<option defaultValue>No Selection Made</option>):("")}
                {
                    props.wardsIsFetched? (
                                                
                        props.wards.map((ward, i) =>(
                            <option
                                key={i}
                                value={ward.id}>
                                {ward.name}
                            </option>
                        ))

                    ):(<option defaultValue>No Data Loaded</option>)
                }
            </select>
        </div >
    )
}

export default withStyles(styles)(OrgUnitForm)



