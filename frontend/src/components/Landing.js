import React, {  useEffect } from 'react';
import '../styles/landing.css'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icon from './MERN_logos/Icon'
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import pathLocations from '../data/pathLocations';
import { changePageTitle } from '../helpers/common'
const useStyles = makeStyles((theme) => ({
    "@global": {
        body: {
            backgroundImage: props => `url('${props.BGurl}')`
        }
    },
    root: {
        flexGrow: 1,
        height:'100vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    paper: {
        height: 150,
        width: 150,
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: "5px",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        paddingTop: "10%", 
    },
    glass:{
        background: "inherit",
        boxShadow: "0 0 1rem 0 rgba(0, 0, 0, .2)",
        "&::before":{
            content: '""',
            position: "absolute",
            background: "inherit",
            zIndex: -1,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",

            filter: "blur(10px)",
            margin: "-20px"
        }
    },
    glassWhite:{
        "&::before":{
            boxShadow: "inset 0 0 2000px rgba(255, 255, 255, .5)",
        },
        color: 'rgba(0, 0, 0, 0.87)'
    },
    glassDark:{
        "&::before":{
            boxShadow: "inset 0 0 2000px rgb(106 107 101 / 30%)",
        },
        color:"white"
    },
    paperLarge: {
        height: 150,
        width: 200,
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: "5px",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        paddingTop: "10%", 
    },
    itemsContainer:{
        position: "absolute",
        left: "0%",
        top: "31%",

    },
    headingGrid:{
        position: "absolute",
        left: "0%",
        top: "15%",

    },
    footer:{
        position: "absolute",
        right: "11%",
        color: "#5f5440",
        filter: "invert(29%) sepia(45%) saturate(285%) hue-rotate(\n0deg\n) brightness(93%) contrast(84%)",
        top: "88%",
        fontWeight: "inherit",
        fontVariantCaps: "petite-caps",
        fontFamily: "Arial",
        fontSize: "16px",
        textShadow: '0px 9px 18px rgba(161, 150, 150, 1)',
        "& > a":{
            fontVariantCaps: "all-small-caps",
        }
    },
    TreeRoot:{
        height: 216,
        flexGrow: 1,
        maxWidth: 400,
        width: '90%',
        "& .MuiTreeItem-root.Mui-expanded > .MuiTreeItem-content .MuiTreeItem-label":{
            backgroundColor: 'rgb(255 255 255 / 0%)',
            fontWeight: 'bold',
            color:'white'
        },
        "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label":{
            backgroundColor:'rgb(255 255 255 / 0%)',
        },
        "& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label:hover":{
            backgroundColor: 'rgb(255 255 255 / 0%)',
        }
    },
    TreeItemBox:{
        marginBottom:'5px'
    },
    mb5:{
        marginBottom: '5px'
    }
}));

export default function Landing(props) {
    const height = window.innerHeight
    const width = window.innerWidth
    const BGurl = `https://picsum.photos/id/721/${width}/${height}`
    // const BGurl = `https://picsum.photos/id/721/${width}/${height}`
    const classes = useStyles({BGurl});
    const icons = ["mongo", "express", "react", "node"]
    
    const handleTreeSelect = (event, nodeId) => {
        
        if(isNaN(nodeId))
            if(nodeId === pathLocations.apiDocs)
                window.open(nodeId, '_blank')
            else
            window.location.href= nodeId
        
    };
    
    useEffect(() => {
        changePageTitle('Landing')
    }, [])
    return(
        <>
        <Container component="main" maxWidth="md" >
            <CssBaseline />
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="center" className={classes.headingGrid}>
                        <Typography variant="h2" color="error" align="center" paragraph>
                                Boilerplate with RBAC <sm>using</sm>
                        </Typography>   
                    </Grid>
                    <Grid container justify="center" spacing="1" className={classes.itemsContainer}>
                        {icons.map((v,i) => {return(
                             <Grid item key={i}>
                                <Paper className={`${classes.paper} ${classes.glass} ${classes.glassWhite}`}>
                                    <Icon type={v}/>    
                                </Paper>
                             </Grid>
                        )})}
                        <Grid item>
                            <Paper className={`${classes.paperLarge} ${classes.glass} ${classes.glassDark}`}>
                                <TreeView
                                    className={classes.TreeRoot}
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    onNodeSelect={handleTreeSelect}
                                >
                                    <TreeItem nodeId="1" label="Auth" className={classes.TreeItemBox} >
                                        <TreeItem  label="Register" nodeId={pathLocations.signup}/>
                                        <TreeItem  label="Login" nodeId={pathLocations.login}/>
                                        <TreeItem  label="Reset Password" nodeId={pathLocations.passwordReset}/>
                                    </TreeItem>
                                    
                                    <TreeItem label="Dashboard" nodeId={pathLocations.dashboard} className={classes.mb5}/>
                                    <TreeItem label="Api Docs" nodeId={pathLocations.apiDocs} />
                                        
                                    
                                </TreeView>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
         <footer className={classes.footer}> Created by <a href="https://github.com/MuhammadAbbasAkhtar/">Muhammad Abbas Akhtar</a></footer>   
        </>
    )
}

