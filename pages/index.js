import { Search } from "@material-ui/icons"
import Auth from '../components/Auth'
import Main from '../components/Main'
import SearchBox from "../components/SearchBox"
import SnakBar from "../components/SnakBar"
import { useEffect, useState, useContext } from "react"
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
  const [count, setCount] = useState(0)

  var _id = localStorage.getItem('_id')
  const token = localStorage.getItem('token')


  useEffect(() => {
    if (count == 0) {
      fetchRooms()
      setCount(count + 1)
    }
  }, [])

  function search(e) {
    setRooms([])
    setShowSkeleton(true)
    var username = e.target.value;
    axios.get(`${APP_CONFIG.baseUrl}/${APP_CONFIG.appVersion}/rooms/findUsers`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: {
        username
      }
    })
      .then(res => {
        setShowSkeleton(false)
        if (!username) {
          setRooms(res.data.rooms)
        }
        else { setRooms(res.data) }
      })
      .catch(err => {
        setShowSkeleton(false)
        setErr(err.response.data.message)
      })
  }

  function fetchRooms() {
    axios.get(`${APP_CONFIG.baseUrl}/${APP_CONFIG.appVersion}/rooms`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        setShowSkeleton(false)
        setRooms(res.data.rooms)
      })
      .catch(err => {
        setShowSkeleton(false)
        setErr(err.response.data.message)
      })
  }

  const classes = useStyles();

  return (
    <Auth>
      <Main selected="chats">
        {err ? <SnakBar open={true}>{err}</SnakBar> : null}
        <div className="top-bar">
          <div className="div-input">
            <Search />
            <input type="text" name="search" placeholder="Search..." onChange={e => search(e)} />
            <input type="submit" style={{ display: "none" }} />

          </div>
        </div>
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
                <ListItemText primary={room.username ? room.username : room.users[room.users.length - 1].username} />
              </ListItem>
            })}
          </List>

          <div className="filled-div"></div>
        </div>
      </Main>
    </Auth>
  )
}
