import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));


export default function SnakBar(props) {
    const [snackPack, setSnackPack] = useState([]);
    const [open, setOpen] = useState(props.open);
    const [messageInfo, setMessageInfo] = useState(undefined);


    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const classes = useStyles();

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            onExited={handleExited}
            message={props.children}
            action={
                <>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </>
            }
        />
    )
}