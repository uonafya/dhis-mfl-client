import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';


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


export const OrgUnitItem = ({orgUnit}) => {
    return (
        <ListItem button >
            <ListItemText primary={orgUnit.name} secondary={orgUnit.code} />
            <ListItemSecondaryAction>
                <Checkbox/>
            </ListItemSecondaryAction>

        </ListItem>
    )
}

export default OrgUnitItem