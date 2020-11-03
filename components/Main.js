import BottomNavigation from './BottomNavigation'
export default function Main(props) {
    return (
        <>
            {props.children}
            <BottomNavigation selected={props.selected}/>
        </>
    )
}