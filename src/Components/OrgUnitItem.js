import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';

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