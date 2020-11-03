import Link from "next/link"
import Auth from '../../components/Auth'
import Main from '../../components/Main'

export default function Profile() {
    return (
        <Auth>
            <Main selected="profile">
                
            </Main>
        </Auth>
        
    )
}