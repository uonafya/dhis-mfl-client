import React from 'react'

import { withStyles } from "material-ui"
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: "30px auto auto auto",
        maxWidth: 1200
    },
    card: {
        minWidth: 275,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
})

const OrgUnitHighlights = (props) => {

    const classes = props.classes
    return (

        <Grid item xs={12} sm={6}>
            {
                props.isOrgUnitLoaded ? (
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography type="body1" className={classes.title}>
                                Selected Organization Unit Highlights
                            </Typography>
                            <Typography type="display1" style={{ marginBottom: 20, marginTop: 20 }} component="h2">
                                {props.orgUnit.name}
                            </Typography>
                            <Grid container spacing={40}>
                                <Grid item xs={12} sm={6}>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        id:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.id}
                                    </Typography>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        code:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.code}
                                    </Typography>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        level:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.level}
                                    </Typography>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        coordinates:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {JSON.stringify(props.orgUnit.coordinates)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        display name:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.displayName}
                                    </Typography>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        children:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.children.length}
                                    </Typography>
                                    <Typography type="body1" style={{ marginBottom: 0 }} className={classes.pos}>
                                        programs:
                                    </Typography>
                                    <Typography type="headline" style={{ marginBottom: 20 }} component="h2">
                                        {props.orgUnit.programs.length}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {
                                props.children ? (
                                    <Grid>
                                        <Typography type="body1" className={classes.title}>
                                            Children
                                        </Typography>
                                        <Grid container>
                                            {props.children.map((child, i) => {
                                                return (
                                                    <Typography type="body1" >
                                                        {child.name}
                                                    </Typography>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Typography type="body1" className={classes.title}>
                                            No children
                                        </Typography>
                                    )
                            }
                        </CardContent>
                        <CardActions>
                            <Typography type="body1" style={{ marginTop: -20 }} className={classes.pos}>
                                Date Opened: {props.orgUnit.openingDate}
                                <br />
                                <span style={{ fontStyle: "italic", fontSize: "90%", color: "#000000" }}>Disclaimer! This information is based on DHIS2 data</span>
                            </Typography>
                        </CardActions>
                    </Card>
                ) : (
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography type="body1" className={classes.title}>
                                    Selected Organization Unit Highlights
                            </Typography>
                                <div style={{ marginLeft: "45%" }}>
                                    {
                                        props.init ? (
                                            <Typography type="headline" style={{ marginLeft: -90 }} component="h2">
                                                Kindly select a county
                                        </Typography>
                                        ) : (
                                                <CircularProgress className={classes.progress} size={50} />
                                            )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    )

            }
        </Grid>

    )
}


export default withStyles(styles)(OrgUnitHighlights)