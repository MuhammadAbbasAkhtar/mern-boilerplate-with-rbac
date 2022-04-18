import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import navItems from '../../data/navItems';
const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex:0,
        [theme.breakpoints.up('sm')]: {
            width: props => props.drawerWidth,
            flexShrink: 0,
        },

    },
    drawerPaper: {
        width: props => props.drawerWidth,
        
    },
    // toolbar: theme.mixins.toolbar,
    pageTitleBox: {
        height: '5.8vh',
        minHeight: '56px',
        textAlign: 'center',
        padding: '5%',
        "& >*":{
            display: 'block',
        },
        [theme.breakpoints.up('sm')]: {
            // height: '71%',
            minHeight: '64px',
            "& >*":{
                display: 'none',
            },
        }
    },
    primaryBG:{
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    
    pageTitle:{
        textTransform: 'capitalize',
        flexGrow: 1,
    }

}));


export default function Nav(props) {
    const classes = useStyles(props);
    const container = window !== undefined ? () => window.document.body : undefined;
    const handleListClick = link => {
        window.location.href = link
        // window.open(link, '_blank')
    }
    const NavBar = (
        <div>
            <div className={`${classes.toolbar} ${classes.primaryBG} ${classes.pageTitleBox}`} >
                <Typography variant="h6" noWrap  className={classes.pageTitle}>{props.pageTitle}</Typography>
            </div>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem button key={index} onClick={() => handleListClick(item.link)}  >
                        <span className={classes.navItemIcon}>{item.icon !== "" && item.icon}</span>
                    <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );
    return(
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    className={classes.drawer}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    variant="temporary"
                    classes={{ paper: classes.drawerPaper }}
                    anchor="left"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <div className={classes.toolbar} />
                    {NavBar}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{ paper: classes.drawerPaper }}
                variant="permanent"
                open
            >
                {NavBar}
            </Drawer>
            </Hidden>
        </nav>
    )
}