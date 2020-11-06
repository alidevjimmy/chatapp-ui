import { Search } from "@material-ui/icons"
import Link from "next/link"
import Auth from '../components/Auth'
import Main from '../components/Main'
import SearchBox from "../components/SearchBox"
import SnakBar from "../components/SnakBar"
import { useEffect, useState } from "react"
import Skeleton from '@material-ui/lab/Skeleton';
import axios from "axios"
import { APP_CONFIG } from '../constant/config'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

function ChatSkeleton() {
  let rows = []
  for (let i = 0; i < 30; i++) {
    rows.push(<div className="div-skeleton">
      <Skeleton variant="circle" width={50} height={45} />
      <div style={{ width: "100%", marginTop: "5px", marginLeft: "10px" }}>
        <Skeleton width="30%" height={20} />
        <Skeleton width="70%" height={20} />
      </div>
    </div>)
  }
  return rows
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Home() {

  const [rooms, setRooms] = useState([])
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [err, setErr] = useState('')
  

  const token = localStorage.getItem('token')

  useEffect(() => {

    axios.get(`${APP_CONFIG.baseUrl}/${APP_CONFIG.appVersion}/rooms`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setShowSkeleton(false)
        setRooms(res.data)
        res.data.forEach(element => {
                     
        });
      })
      .catch(err => {
        setShowSkeleton(false)
        console.log(err.response)
        setErr(err.response.data.message)
      })
  }, [])

  const classes = useStyles();

  return (
    <Auth>
      <Main selected="chats">
        {err ? <SnakBar open={true}>{err}</SnakBar> : null}
        <SearchBox />
        <div className="chat-div">
          {showSkeleton ? ChatSkeleton() : null}

          <List className={classes.root}>
            {rooms.length == 0 ? <h4 className="not-found-err">Room Not Found</h4> : rooms.map(room => {
              return <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              </ListItem>
            })}
          </List>

          <div className="filled-div"></div>
        </div>
      </Main>
    </Auth>
  )
}
