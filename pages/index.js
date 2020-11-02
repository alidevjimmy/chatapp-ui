import Link from "next/link"
import Auth from '../components/Auth'
import BottomNavigation from '../components/BottomNavigation'

export default function Home() {
  return (
    <Auth>
      <BottomNavigation />
    </Auth>
  )
}
