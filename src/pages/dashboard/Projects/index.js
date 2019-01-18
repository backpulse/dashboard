import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import strings from 'strings';

import client from 'services/client';

import './styles.scss';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Projects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            dialogOpen: false
        }
    }

    fetchProjects = () => {
        client.get('/projects/'+ this.props.match.params.name).then(response => {
            const projects = response.data.payload;
            this.setState({projects});
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleNewProject = () => this.setState({
        dialogOpen: true
    });

    handleClose = () => this.setState({
        dialogOpen: false
    })

    render() {
        return (
            <div className="page dashboard-projects">
                {/* <AppBar title={this.props.match.params.name}/> */}
                {/* <DrawerMenu/> */}
                <Fab onClick={this.handleNewProject} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Fab>
                <h1>Projects</h1>
                <div className="projects-container">
                    {this.state.projects.map((project, i) => {
                        return <div>project</div>;
                    })}
                </div>

                <Dialog
                    fullScreen
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className="topbar">
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flex: 1}}>
                            {strings.PROJECTS_NEW_PROJECT}
                        </Typography>
                        <Button color="inherit" onClick={this.handleClose}>
                            {strings.SAVE}
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                    </Dialog>
            </div>
        );
    }
}

export default withRouter(Projects);