import LinearBuffer from './progressbar'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useState} from 'react'

export default function Main(props) {

    const router = useRouter()
    const [progress , setProgress] = useState(false)

    useEffect(() => {
        
        const handleRouteChange = (url) => {
            setProgress(true)
            console.log(progress)
        }

        router.events.on('routeChangeStart' , handleRouteChange)

        return () => {
            router.events.off('routeChangeStart' , handleRouteChange)
        }
    } , [progress])
    return (
        <>
            {progress ? <LinearBuffer /> : null}
            {props.children}
        </>
    )
}