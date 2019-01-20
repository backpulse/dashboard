import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';

import ProjectBox from 'components/ProjectBox';

import strings from 'strings';

import client from 'services/client';

import './styles.scss';

class Projects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            fetched: false
        }
    }
    
    componentWillReceiveProps() {
        this.fetchProjects();
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = () => {
        this.setState({fetched: false});
        client.get('/projects/'+ this.props.match.params.name).then(response => {
            const projects = response.data.payload || [];
            this.setState({projects, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    editProject = project => {
        this.props.history.push('/site/' + this.props.match.params.name + '/projects/edit/' + project.short_id);
    }

    handleNewProject = () => {
        this.props.history.push('/site/' + this.props.match.params.name + '/projects/new');
    }

    render() {
        return (
            <div className="page dashboard-projects">
                <Fab onClick={this.handleNewProject} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Fab>
                <div className="title-div">
                    <h1>{strings.DRAWER_PROJECTS}</h1>
                </div>
                {this.state.projects.length < 1 && this.state.fetched && <Button onClick={this.handleNewProject} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Button>}
                <div className="projects-container">
                    {this.state.projects.map((project, i) => {
                        return <ProjectBox key={i} onOpen={() => this.editProject(project)} project={project}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(Projects);