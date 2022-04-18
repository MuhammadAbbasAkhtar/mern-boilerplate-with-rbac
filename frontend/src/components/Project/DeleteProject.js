import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
    root: {
        minWidth: 200,
        fontFamily: "'Varela Round', sans-serif",
        padding: "20px",
        borderRadius: "5px",
        border: "none",
        textAlign: "center",
        fontSize: "14px"
    },
    confirm:{
        textAlign: 'center',
        margin: '15px 0 -10px',
        fontSize: "26px"
    },
    iconBox:{
        width: "80px",
        height: "80px",
        margin: "0 auto",
        borderRadius: "50%",
        zIndex: 9,
        textAlign: "center",
        border: "3px solid #f15e5e"
    },
    iconBoxIcon:{
        color: "#f15e5e",
        fontSize: "46px",
        display: "inline-block",
        marginTop: "13px"
    },
    cardHeader:{
        "& .MuiCardHeader-avatar":{
            flex: "80 80 auto", marginRight: "0" 
        }
    },
    cardContent:{
        paddingTop: "0"
    },
    cardContentBody: {
        color: "#999",
        paddingTop: "16px"
    },
    cardFooter:{
        border: "none",
        textAlign: "center",
        borderRadius: "5px",
        fontSize: "13px",
        padding: "10px 15px 25px",
        display: "contents",
        "& button":{
            minWidth: "120px",
            border: "none",
            minHeight: "40px",
            borderRadius: "3px",
            margin: "0 5px",
            outline: "none !important",
            color: "white",
        },
    },
    
   

})
const DeleteButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'uppercase',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#f15e5e',
      borderColor: '#f15e5e',
      '&:hover': {
        backgroundColor: '#ee3535',
        borderColor: '#ee3535',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#ee3535',
        borderColor: '#ee3535',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
})(Button);
const InfoButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'uppercase',
      fontSize: 16,
      padding: '6px 12px',
      border: '1px solid',
      lineHeight: 1.5,
      backgroundColor: '#a8a8a8',
      borderColor: '#a8a8a8',

      '&:hover': {
        backgroundColor: '#a8a8a8',
        borderColor: '#a8a8a8',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#a8a8a8',
        borderColor: '#a8a8a8',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
})(Button);
function DeleteProject(props){
    const classes = useStyles();
    const handleCancel = () => {
        props.cancel();
    }
    const handleDelete = () => {
        props.delete();
    }
    useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
    
        return () => {
          node.parentNode.removeChild(node);
        };
    }, []);
    return(
        <>
        <Card className={classes.root} elevation={0}>
            <CardHeader className={classes.cardHeader}
                avatar={<div className={classes.iconBox}><Icon className={`fa fa-times ${classes.iconBoxIcon}`}  color="primary"/></div>}
               
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4" className={classes.confirm}>Are you sure ?</Typography>
                <div className={classes.cardContentBody}>
                    <p>Do you really want to delete this project? This process cannot be undone.</p>
                </div>
            </CardContent>
            
            
            <CardActions className={classes.cardFooter}>
                <InfoButton variant="contained" onClick={handleCancel}>Cancel</InfoButton>
                <DeleteButton variant="contained" onClick={handleDelete}>Delete</DeleteButton>
               
            </CardActions>
        </Card>
        </>
    )
}

export default DeleteProject;