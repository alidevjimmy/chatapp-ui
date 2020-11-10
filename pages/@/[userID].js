import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import Auth from "../../components/Auth";
import axios from 'axios'
import { APP_CONFIG } from '../../constant/config'
import SnakBar from '../../components/SnakBar'
import TopBar from '../../components/ToBar'
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';


function ChatSkeleton() {
    let rows = []
    for (let i = 0; i < 30; i++) {
        rows.push(
            i % 2 == 0 ? <div className="div-skeleton" key={i} dir="rtl">
                <Skeleton variant="circle" width={50} height={45} />
                <div style={{ width: "100%", marginTop: "5px", marginRight: "10px" }}>
                    <Skeleton width="70%" height={40} />
                </div>
            </div> : <div className="div-skeleton" key={i}>
                    <Skeleton variant="circle" width={50} height={45} />
                    <div style={{ width: "100%", marginTop: "5px", marginLeft: "10px" }}>
                        <Skeleton width="70%" height={20} />
                        <Skeleton width="30%" height={20} />
                    </div>
                </div>
        )
    }
    return rows
}

export default function Room() {
    const router = useRouter()
    const { userID } = router.query
    const [data, setData] = useState({})
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [err, setErr] = useState('')
    const [title, setTitle] = useState('')

    var _id = localStorage.getItem('_id')

    const token = localStorage.getItem('token')
    useEffect(() => {
        
        fetchData()
    }, [])


    function fetchData() {
        axios.post(`${APP_CONFIG.baseUrl}/${APP_CONFIG.appVersion}/rooms`, {
            targetUserId: userID
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            },

        })
            .then(res => {
                setShowSkeleton(true)
                setData(res.data)
                if (res.data.users[1]._id != _id) {
                    setTitle(res.data.users[1].username)
                } 
                else {
                    setTitle(res.data.users[0].username)
                }
            })
            .catch(err => {
                setShowSkeleton(true)
                console.log(err)
                setErr(err.response.data.message)
            })
    }

    return (
        <Auth>
            {err ? <SnakBar open={true}>{err}</SnakBar> : null}
            <TopBar title={title} />

            <div className="chat-div">
                {showSkeleton ? ChatSkeleton() : null}

                {/* <List className={classes.root}>
                    {rooms.length == 0 ? <h4 className="not-found-err">Room Not Found</h4> : rooms.map(room => {
                        return <ListItem button>
                            <ListItemAvatar>
                                <Avatar>
                                    <Person />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={room.username ? room.username : room.users[room.users.length - 1].username} secondary="Jan 9, 2014" />
                        </ListItem>
                    })}
                </List> */}

                <div className="filled-div" style={{ height: 100 }}></div>
            </div>
            <section className="chat-back">
                <div className="chat-input-back">
                    <form className="chat-form">
                        <input placeholder="Type your message" className="chat-box" />
                        <IconButton aria-label="delete" className="send-button">
                            <Send />
                        </IconButton>
                    </form>
                </div>
            </section>
        </Auth>
    )
}