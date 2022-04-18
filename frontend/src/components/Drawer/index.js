import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles} from '@material-ui/core/styles';
import InfoBar from './InfoBar';
import Nav from './Nav';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color:theme.palette.primary.contrastText
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Drawer(props){
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useEffect( ()=> {
        function handleResize() {
            if(window.innerWidth >= 600)
                setMobileOpen(false)
        }
        window.addEventListener('resize', handleResize)
    })
    return(
        <div className={classes.root}>
            <CssBaseline />
            <InfoBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} pageTitle={props.pageTitle}/>
            <Nav drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} pageTitle={props.pageTitle}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.content} 
            </main>
        </div>
    )
}
