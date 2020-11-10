import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Chat from '@material-ui/icons/Chat';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import { useRouter } from 'next/router'
import Link from "next/link";

const useStyles = makeStyles({
    root: {
        width: 500,
        position: 'fixed',
        bottom: '0',

    },
});

const ButtonLink = ({ className, href, hrefAs, children, prefetch }) => (
    <Link href={href} as={hrefAs} prefetch>
      <a className={className}>
        {children}
      </a>
    </Link>
  )

export default function LabelBottomNavigation(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(props.selected);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root} style={{ width: '100%', height: 'auto', backgroundColor: "#162447" }}>
            <BottomNavigationAction component={ButtonLink} href="/profile" as="/profile" label="Profile" value="profile" icon={<Person color={value == 'profile' ? "secondary" : ""} />} />
            <BottomNavigationAction component={ButtonLink} href="/" href="/" label="Chats" value="chats" icon={<Chat color={value == 'chats' ? "secondary" : ""} />} />
            <BottomNavigationAction component={ButtonLink} href="/setting" href="/setting" label="Setting" value="setting" icon={<Settings color={value == 'setting' ? "secondary" : ""} />} />
        </BottomNavigation>
    );
}
