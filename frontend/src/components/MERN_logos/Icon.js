import React from 'react';
import { ReactComponent as ExpressLogo } from './express.svg'
import { ReactComponent as ReactLogo } from './react.svg'
import { ReactComponent as MongoLogo } from './mongodb.svg'
import { ReactComponent as NodeLogo } from './nodejs.svg'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    iconText:{
        marginTop: '4%',
    },
    logoLink:{
        textDecoration:'unset',
        color: 'rgba(0, 0, 0, 0.87)',
        "& :hover":{
            textDecoration:"underline"
        }
    }
}));

export default function Icon(props){
    const classes = useStyles();
    let url;
    switch(props.type){
        case "mongo": url = "www.mongodb.com/"; break;
        case "express": url = "expressjs.com/"; break;
        case "react": url = "reactjs.org/"; break;
        case "node": url = "nodejs.org/"; break;
        default: break;
    }
    return(
        <>
        <a href={`https://${url}`} target="_blank" className={classes.logoLink} rel="noreferrer">
            {props.type === "mongo" && <MongoLogo height="100" width="150"/>}
            {props.type === "express" && <ExpressLogo height="100" width="120"/>}
            {props.type === "react" && <ReactLogo height="100" width="90"/>}
            {props.type === "node" && <NodeLogo height="100" width="90"/>}
            <Typography variant="button" display="block" gutterBottom align="center" className={classes.iconText}>
                {props.type}
            </Typography>
            </a>
        </>
    )
}