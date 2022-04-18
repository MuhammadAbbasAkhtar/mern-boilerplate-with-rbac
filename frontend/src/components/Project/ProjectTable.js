import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
  },
  button:{
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
        width: "10%",
        minWidth: 25,
        '& .MuiButton-startIcon' :{
            marginRight:0
        }
    }
  },
  AB_text:{
    [theme.breakpoints.down('sm')]: {
        display:'none'
    }
  }
}));

function ActionButton(props){
    const classes = useStyles();
    return(
        <>
             {/* <Button
                variant={props.editvariant}
                color={props.editColor}
                className={classes.button}
                startIcon={<EditRoundedIcon />}
                onClick={() => props.onClickEdit(props.id)}
            >
                <span className={classes.AB_text}>Edit</span>
            </Button> */}
             <Button
                variant={props.deleteVariant}
                color={props.deleteColor}
                className={classes.button}
                startIcon={<DeleteRoundedIcon />}
                onClick={() => props.onClickDelete(props.id)}
            >
                <span className={classes.AB_text}>Delete</span>
            </Button>
        </>
    )
}

function ProjectTable(props) {
    const classes = useStyles();
    const projects = props.projects || []
    // console.log(projects);
    const getLanguage = () => navigator.userLanguage || (navigator.languages && navigator.languages.length && navigator.languages[0]) || navigator.language || navigator.browserLanguage || navigator.systemLanguage || 'en';
    
    const handleEditProjectonClick = (id) => {
        props.handleEditProject(id)
    }
    const handleDeleteProjectonClick = (id) => {
        props.handleDeleteProject(id)
    }
    
    return(
        
        <TableContainer component={Paper} elevation={3}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell style={{width:"40%"}}>Project Name</TableCell>
                    <TableCell align="center">Created by</TableCell>
                    <TableCell align="center">Created At</TableCell>
                    <TableCell align="center">Updated At</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map( (row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.createdBy.map(n => (n+" "))}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString(getLanguage())}</TableCell>
                            <TableCell align="center">{row.createdAt !== row.updatedAt ? new Date(row.updatedAt).toLocaleString(getLanguage()): ""}</TableCell>
                            <TableCell align="center">
                                <ActionButton editvariant="outlined" deleteVariant="contained" 
                                    editColor="primary"  deleteColor="primary"
                                    onClickEdit={handleEditProjectonClick}  onClickDelete={handleDeleteProjectonClick}
                                    id={row._id}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
    
}

export default ProjectTable