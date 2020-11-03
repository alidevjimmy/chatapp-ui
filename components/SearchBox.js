import Search from '@material-ui/icons/Search'

export default function SearchBox() {

    return (
        <div className="top-bar">
            <div className="div-input">
                <Search/>
                <input type="text" placeholder="Search..."/>
            </div>
        </div>
    )
} 