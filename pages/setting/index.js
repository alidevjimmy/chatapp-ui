import Link from "next/link"
import Auth from '../../components/Auth'
import Main from '../../components/Main'
import Exit from '@material-ui/icons/ExitToApp'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import {useRouter} from 'next/router'


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
  }));
  

export default function Setting() {

    function logout() {
        const router = useRouter()
        localStorage.clear()
        router.push('/login')
    
    }
    
    const classes = useStyles();

    return (
        <Auth>
            <Main selected="setting">
                <List className={classes.root}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar>
                                <Exit />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Exit" onClick={logout} />
                    </ListItem>

                </List>
            </Main>
        </Auth>
    )
}