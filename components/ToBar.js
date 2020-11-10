import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';
import Person from '@material-ui/icons/PersonOutlined';

export default function TopBar(props) {
    return <section className="top-bar" style={{ padding: "10px", display: "flex", alignItems: "center" }}>
        <IconButton aria-label="delete" onClick={e => {return window.history.back()}}>
            <ArrowBack />
        </IconButton>
        <Avatar>
            <Person />
        </Avatar>
        <h4 style={{marginLeft : "10px"}}>{props.title}</h4>
        <IconButton aria-label="delete" style={{    position: "absolute",right : "10px"}}>
            <Search />
        </IconButton>
    </section>
} 