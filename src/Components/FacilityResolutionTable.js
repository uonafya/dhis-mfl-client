
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});


const FacilityResolutionTable = (props) => {
    const classes = props.classes;

    return (
        <Paper className={classes.paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: 33}}>Org unit</TableCell>
                        <TableCell style={{ width: 33}}>DHIS2</TableCell>
                        <TableCell  style={{ width: 33}}>KMHFL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((facility, i) => {
                        return (
                            <TableRow key={i}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell >{facility.name.meta.dhis2Name}</TableCell>
                                    <TableCell >{facility.name.meta.mflName}</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell>code</TableCell>
                                    <TableCell >{facility.code.meta.dhis2Code}</TableCell>
                                    <TableCell >{facility.code.meta.mflCode}</TableCell>
                                </TableRow>
                                <TableRow/>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

FacilityResolutionTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FacilityResolutionTable);