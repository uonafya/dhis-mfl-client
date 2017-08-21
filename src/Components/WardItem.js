import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Button from "material-ui/Button"

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
    button: {
        margin: theme.spacing.unit,
    }
})


export const WardItem = ({ ward, getFacilities }) => {
    return (
        <ListItem  >
            <ListItemText primary={ward.name} secondary={ward.id} />
            <ListItemSecondaryAction>
                <Button raised
                    onClick={() => {
                        getFacilities(ward.id)
                    }}>
                    View Mappings
                </Button>
            </ListItemSecondaryAction>

        </ListItem>
    )
}

export default WardItem