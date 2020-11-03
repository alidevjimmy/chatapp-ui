import { Search } from "@material-ui/icons"
import Link from "next/link"
import Auth from '../components/Auth'
import Main from '../components/Main'
import SearchBox from "../components/SearchBox"
import { useEffect, useState } from "react"
import Skeleton from '@material-ui/lab/Skeleton';


function chatSkeleton() {
  for (let i = 0; i < 30; i++) {
    return <Skeleton animation="wave" />
  }
}

export default function Home() {

  const [rooms, setRooms] = useState({})
  const [fakes, setFakes] = useState([])

  for (let i = 0; i < 30; i++) {
  setFakes([...fakes, <Skeleton animation="wave" />])
  }

  // useEffect()

  return (
    <Auth>
      <Main selected="chats">
        <SearchBox />
        <div className="chat-div">
          {fakes.map((v, i) => {
            { v }
          })}
          <div className="filled-div"></div>
        </div>
      </Main>
    </Auth>
  )
}
