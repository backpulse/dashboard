import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Input from '@material-ui/core/Input';

import ProjectBox from 'components/ProjectBox';

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
            languages: [],
            dialogOpen: false,

            titles: [],
            descriptions: [],
            url: "",
            id: "",
            short_id: ""
        }
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = () => {
        client.get('/projects/'+ this.props.match.params.name).then(response => {
            const projects = response.data.payload;
            this.setState({projects});
        }).catch(err => {
            if(err) throw err;
        });
    }

    fetchLanguages = () => {
        client.get('/constants/languages').then(response => {
            const languages = response.data.payload;
            languages.sort(function(a, b){
                if(a.Name < b.Name) { return -1; }
                if(a.Name > b.Name) { return 1; }
                return 0;
            })
            this.setState({languages});
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleNewProject = () => {
        this.fetchLanguages();
        this.setState({
            dialogOpen: true
        })
    };

    handleClose = () => this.setState({
        dialogOpen: false
    })

    fetchProject = id => {
        client.get('/project/'+ id).then(response => {
            const project = response.data.payload;
            this.setState({...project});
            console.log(project);
        }).catch(err => {
            if(err) throw err;
        });
    }

    editProject = project => {
        this.fetchLanguages();
        this.fetchProject(project.short_id);
        this.setState({
            dialogOpen: true,
        });
    }

    handleChangeTitle = (event, language, i) => {
        const value = event.target.value;
        const titles = this.state.titles;
        titles[i].content = value;
        this.setState({
            titles: titles
        });
    }

    handleTitleRemove = (language, i) => {
        const titles = this.state.titles;
        titles.splice(i, 1);
        this.setState({titles});
    }

    onTitleLanguageAdd = e => {
        const language = e.target.value;
        const titles = this.state.titles;
        titles.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({titles});
    }

    handleSave = () => {
        client.put('/projects/' + this.props.match.params.name, {
            titles: this.state.titles,
            descriptions: this.state.descriptions,
            id: this.state.id,
            short_id: this.state.short_id,
            url: this.state.url
        }).then(response => {
            this.handleClose();
            this.fetchProjects();
        }).catch(err => {
            if(err) throw err;
        });
    }
    

    render() {
        return (
            <div className="page dashboard-projects">
                <Fab onClick={this.handleNewProject} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Fab>
                <h1>{strings.DRAWER_PROJECTS}</h1>
                <div className="projects-container">
                    {this.state.projects.map((project, i) => {
                        return <ProjectBox key={i} onOpen={() => this.editProject(project)} project={project}/>;
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
                        <Button color="inherit" onClick={this.handleSave}>
                            {strings.SAVE}
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className="dialog-content">
                        <Grid container direction="column">
                            <Grid item xs={12} md={4}>
                                <div className="title-div">
                                    <h1>{strings.TITLES}</h1>
                                    <FormControl fullWidth>
                                        <InputLabel>{strings.ADD_TRANSLATION}</InputLabel>
                                        <Select
                                            value={""}
                                            onChange={this.onTitleLanguageAdd}
                                            >
                                            {this.state.languages.map((lang, i) => {
                                                return ( 
                                                    <MenuItem key={i} value={lang}>{lang.Name}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>
                            {this.state.titles.map((title, i) => (
                                <Grid key={i} item xs={12} md={4}>
                                    <TextField
                                        label={title.language_name}
                                        variant="outlined"
                                        value={title.content}
                                        onChange={e => this.handleChangeTitle(e, title, i)}
                                        margin="dense"
                                        fullWidth
                                        InputProps={{
                                        endAdornment: (
                                            <InputAdornment className="remove-button" position="end">
                                                {this.state.titles.length > 1 && <RemoveCircle
                                                    onClick={() => this.handleTitleRemove(title, i)}
                                                >
                                                </RemoveCircle>}
                                            </InputAdornment>
                                        )
                                        }}
                                    />
                                </Grid>
                            ))}
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}
                        </Grid>
                    </DialogContent>
                    </Dialog>
            </div>
        );
    }
}

export default withRouter(Projects);