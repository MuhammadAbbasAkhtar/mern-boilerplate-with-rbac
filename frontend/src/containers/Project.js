import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { changePageTitle } from '../helpers/common'
import Drawer from '../components/Drawer'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {ProjectForm, ProjectTable, DeleteProject} from '../components/Project';
import { FloatingButton } from '../components/Buttons';
import AddIcon from '@material-ui/icons/Add';
// Helpers
import decodeToken from '../helpers/decodeToken'
import { apiGet, apiPost,apiDelete } from '../helpers/APIRequests';
import Modal from '@material-ui/core/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    modalPaper: {
        position: 'absolute',
        width: "40%",
        minWidth: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
});


function getModalStyle() {
    return {
      top: `35%`,
      left: `50%`,
      transform: `translate(-55%, -50%)`,
    };
}

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            projects:[], 
            modelOpen:false, 
            modalType:"",
            projectData:{},
            successMsg:"",
            errorMsg:"",
            deleteId:"",
        }
        
    }
    getProjectsList = () => {
        apiGet('/api/project/', response =>  {
            if(response.success) this.setState({projects:response.projects})
        },null, {'Authorization': `Bearer ${decodeToken().token}`})
    }
    componentDidMount(){
        changePageTitle('Projects')
        this.getProjectsList()
    }
    handleEditProject = (id) => {
        var project = this.state.projects.find(obj => obj._id === id)
        this.setState({modelOpen:true, modalType:"edit", projectData:project})
    }
    handleDeleteProject = (id) => {
        this.setState({modelOpen:true, modalType:"delete",projectData:{}, deleteId:id})
    }
    handleModelClose = () => {
        this.setState({modelOpen:false})
    }
    handleCreateProject = () => {
        this.setState({modelOpen:true, modalType:"create",projectData:{}})
    }

    handleFormSubmit = projectName => {
        var endpoint = this.state.modalType === "create" ? '/api/project/add':'/api/project/edit'
        apiPost(endpoint, {name:projectName}, (res) => {
            if(res.success){
                this.setState({modelOpen:false, successMsg:res.message})
                toast.success(res.message)
                this.getProjectsList()
            }else{
                this.setState({errorMsg:res.error.name})
            }
        },{'Authorization': `Bearer ${decodeToken().token}`})
    }
    handleDeleteProjectSubmit = () => {
        if(this.state.modalType === "delete" ){
            const projectId = this.state.deleteId;
            
            apiDelete(`/api/project/${projectId}`, (res) => {
                console.log(`res`, res)
                if(res.success){
                    this.setState({modelOpen:false})
                    toast.success("Project Deleted Successfully")
                    this.getProjectsList()
                }
                else{
                    toast.error(res.message)
                }
            }, (err) => {
                const msg = err.response.message || err.response.statusText
                toast.error(`${err.response.status} - ${msg}`)
            }, {'Authorization': `Bearer ${decodeToken().token}`})
        }
    } 
    render() { 
        const { classes } = this.props;
        const pageTitle = "Projects"
        const {projects, modelOpen, modalType, projectData,errorMsg} = this.state
        const content = (
            <div className={classes.root}>
            
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <FloatingButton icon={<AddIcon className={classes.extendedIcon}/>} size="medium" label="Add Project" color="primary" style={{float:"right"}} hasBoxShadow={false} onClick={this.handleCreateProject}/>
                            <ProjectTable projects={projects} 
                                handleEditProject={this.handleEditProject} 
                                handleDeleteProject={this.handleDeleteProject}
                            ></ProjectTable>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Modal
                        open={modelOpen}
                        onClose={this.handleModelClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                         <div style={getModalStyle()} className={classes.modalPaper}>
                            {modalType !== "delete" ? <ProjectForm 
                                data={projectData} type={modalType} 
                                formSubmit={this.handleFormSubmit} errorMsg={errorMsg}></ProjectForm>:
                                <DeleteProject delete={this.handleDeleteProjectSubmit} cancel={this.handleModelClose}/>}

                         </div>
                    </Modal>
                    </Grid>
                </Grid>
                <ToastContainer />
            </div>
                
            
        );
        return ( <Drawer content={content} pageTitle={pageTitle}/>   )

    }
}
export default withStyles(useStyles)(Project);