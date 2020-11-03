import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chat from '@material-ui/icons/Chat';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
    root: {
        width: 500,
        position: 'fixed',
        bottom: '0',

    },
});

export default function LabelBottomNavigation(props) {
    const classes = useStyles();
    const router = useRouter()
    const [value, setValue] = React.useState(props.selected);

    const handleChange = (event, newValue) => {
        if (newValue == 'chats') {
            router.push('/')
        } else {
            router.push(newValue)
        }
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root} style={{ width: '100%', height: 'auto', backgroundColor: "#162447" }}>
            <BottomNavigationAction label="Profile" value="profile" icon={<Person color={value == 'profile' ? "secondary" : ""}/>} />
            <BottomNavigationAction label="Chats" value="chats" icon={<Chat color={value == 'chats' ? "secondary" : ""}/>} />
            <BottomNavigationAction label="Setting" value="setting" icon={<Settings color={value == 'setting' ? "secondary" : ""}/>} />
        </BottomNavigation>
    );
}
