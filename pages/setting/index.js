import Link from "next/link"
import Auth from '../../components/Auth'
import Main from '../../components/Main'

export default function Setting() {
    return (
        <Auth>
            <Main selected="setting">
                Setting
            </Main>
        </Auth>
    )
}