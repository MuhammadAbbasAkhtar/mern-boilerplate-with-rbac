import React,{ useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import pathLocations from '../../data/pathLocations'
import Copyright from '../Copyright'
import { apiPost, production } from '../../helpers/APIRequests'

import { changePageTitle } from '../../helpers/common'

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(3, 2),
        height:'80vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorText:{
    color: 'red'
  },
  successText:{
    color: 'blue'
  },
  verifyLink:{
    marginTop:'10px',
    // paddingLeft: '7%',
    "& > span": { fontWeight: 600, }
  }
}));

export default function SignUp() {
  const classes = useStyles()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mobile_number, setMobile_number] = useState('')
  const [formError, setFormError] = useState({
    firstName:'', lastName:'', email:'', mobile_number:'', password:'', message:''
  })
  const [formSuccess, setFormSuccess] = useState({message: ''})
  const [verifylink, setVerifyLink] = useState('')
  

  const handleSumbit = () => {
    
    
      apiPost('/api/auth/register', {firstName:fname, lastName:lname, email, password,mobile_number}, res =>{
        
        if(!res.success){
          if(res.error)
            setFormError(res.error)
          else
            setFormError({message:res.message})
        }
        else{
          
          setFormError({firstName:'', lastName:'', email:'', mobile_number:'', password:'', message:''})
          setFormSuccess({message:res.message})
          if(!production)
            if(res.link){
              var link = res.link.split('/')
              var token = link[link.length -1]
              setVerifyLink(`${window.location.origin}${pathLocations.verifyEmail}/${token}`);
            }
        }
       

        
       
      })
    
  }
  useEffect(() => {
    changePageTitle('User Registration')
  }, [])
  
  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FieldError msg={formError.firstName} />
              <TextField
                autoComplete="first-name"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldError msg={formError.lastName} />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="last-name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FieldError msg={formError.email} />
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <FieldError msg={formError.mobile_number} />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="mobile_number"
                label="mobile_number"
                type="number"
                id="mobile_number"
                autoComplete="mobile_number"
                value={mobile_number}
                onChange={(e) => setMobile_number(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
            <FieldError msg={formError.password} />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
           
           
          <FieldError msg={formError.message} />
          <FieldSuccess msg={formSuccess.message}/>
          <VerifyLink link={verifylink}/>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSumbit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href={pathLocations.login} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

function FieldError(props) {
  const classes = useStyles()
  return(
    <sm>&nbsp; <span className={classes.errorText}>{props.msg}</span></sm>
  )
}
function FieldSuccess(props) {
  const classes = useStyles()
  return(
    <sm><span className={classes.successText}>{props.msg}</span></sm>
  )
}
function VerifyLink(props){
  const classes = useStyles()
  return(
    <sm className={classes.verifyLink}><span>{props.link}</span></sm>
  )
}