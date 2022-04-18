import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

function ProjectForm(props) {
    const classes = useStyles();
    const [projectName, setProjectName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    
    const handleChange = (event) => {
        setProjectName(event.target.value);
    };
    const handleFormSubmit = () => {

        props.formSubmit(projectName)
    }

    useEffect(() => {
        if(props.data !== {}) setProjectName(props.data.name)
    }, [props.data])
    useEffect(() => {
        setErrorMsg(props.errorMsg)
    }, [props.errorMsg])
    return(
        <>
            <Grid container spacing={1}  style={{display: 'block'}} >
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-name"
                            label="Project Name"
                            Placeholder="Project Name"
                            value={projectName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={errorMsg !== '' ? true:false}
                            helperText={errorMsg !== '' ? errorMsg:''}
                        />
                    </Grid>

                    <Grid item xs={6} style={{float:'right'}}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleFormSubmit}>
                            {props.type === "edit" ? 'Save': 'Create' } Project
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

export default ProjectForm