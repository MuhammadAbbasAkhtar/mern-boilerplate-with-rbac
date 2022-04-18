import React, { Component } from 'react';
import * as auth from '../helpers/UserAuth'
import decodeToken from '../helpers/decodeToken'
import { withStyles } from '@material-ui/core/styles';
import { changePageTitle } from '../helpers/common'
import Drawer from '../components/Drawer'
import Typography from '@material-ui/core/Typography';

const useStyles = theme => ({
    dashHeading: {
       "& > span":{
        textTransform: 'capitalize',
       }
    },
    "@global": {
        body: {
            backgroundImage: `url('${`https://picsum.photos/id/985/${window.innerWidth}/${ window.innerHeight}`}?blur=8') `,
            backgroundRepeat: 'no-repeat',
            backgroundClip: 'padding-box',
            backgroundSize: 'cover'
        }
    },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);
         this.state = { user:null }
        
    }

    componentDidMount(){
        changePageTitle('Dashboard')
        const user = decodeToken(auth.getToken())
        this.setState({user})
    }
    render() { 
        //const { classes } = this.props;
        const role = this.state.user !== null ? this.state.user.role : ''
        const pageTitle = role +" Dashboard"
        const content = (
            <>
            {/* <Container component="main" maxWidth="xl">
                
                <Container component="main" maxWidth="lg">
                   
                   
                </Container>
            </Container> */}
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                    facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                    tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                    consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                    vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                    hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                    tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                    nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </>
        );
        return (
            <Drawer content={content} pageTitle={pageTitle}/>
            
        );    
    }
}
 
export default withStyles(useStyles)(Dashboard);