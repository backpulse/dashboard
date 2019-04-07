import React from 'react';

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
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {withRouter} from 'react-router';

import Selector from 'components/Selector';
import {getTheme} from 'utils';

import client from 'services/client';

import strings from 'strings';
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EditProject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            languages: [],
            open: true,
            confirmDelete: false,
            titles: [],
            descriptions: [],
            url: "",
            id: "",
        }
    }

    componentDidMount() {
        if(!this.props.new) {
            this.fetchProject(this.props.match.params.id);
        } else {
            this.setupNewProject();
        }
        this.fetchLanguages();
    }

    setupNewProject = () => {
        this.setState({
            url: "",
            id: "",
            titles: [{
                "language_name": "English",
                "language_code": "en",
                "content": "New title"
            }],
            descriptions: [{
                "language_name": "English",
                "language_code": "en",
                "content": "New description"
            }]
        })
    };

    handleClose = () => {
        this.setState({
            open: false,
            confirmDelete: false
        });
        setTimeout(() => {
            this.props.history.replace('/site/' + this.props.match.params.name + '/projects');
        }, 250);
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

    fetchProject = id => {
        client.get('/project/'+ id).then(response => {
            const project = response.data.payload;
            this.setState({...project});
        }).catch(err => {
            this.handleClose();
            if(err) throw err;
        });
    }

    handleChangeTitle = (event, i) => {
        const value = event.target.value;
        const titles = this.state.titles;
        titles[i].content = value;
        this.setState({
            titles
        });
    }

    handleChangeDescription = (e, i) => {
        const value = e.target.value;
        const descriptions = this.state.descriptions;
        descriptions[i].content = value;
        this.setState({
            descriptions
        });
    }

    handleTitleRemove = i => {
        const titles = this.state.titles;
        titles.splice(i, 1);
        this.setState({titles});
    }
    handleDescriptionRemove = i => {
        const descriptions = this.state.descriptions;
        descriptions.splice(i, 1);
        this.setState({descriptions});
    }

    onTitleLanguageAdd = e => {
        if(!e) return
        const language = e.value;
        const titles = this.state.titles;
        titles.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({titles});
    }

    onDescriptionLanguageAdd = e => {
        if(!e) return
        const language = e.value;
        const descriptions = this.state.descriptions;
        descriptions.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({descriptions});
    }

    handleSave = () => {
        client.put('/projects/' + this.props.match.params.name, {
            titles: this.state.titles,
            descriptions: this.state.descriptions,
            id: this.state.id,
            url: this.state.url
        }).then(response => {
            this.handleClose();
        }).catch(err => {
            if(err) throw err;
        });
    }
    

    openConfirmDelete = () => this.setState({
        confirmDelete: true
    });

    handleConfirmClose = () => this.setState({
        confirmDelete: false
    });

    deleteProject = () => {
        client.delete('/project/' + this.state.id).then(response => {
            this.handleClose();
        }).catch(err => {
            if(err) throw err;
        });
    }

    getAvailableTitleLanguages = () => {
        const languages = this.state.languages;
        const available = [];
        languages.forEach((lang) => {
            let exists = false;
            for(let i = 0; i < this.state.titles.length; i++) {
                const title = this.state.titles[i];
                if(title.language_code === lang.Code) {
                    exists = true;
                    break;
                }
            }
            if(!exists) {
                available.push({
                    label: lang.Name,
                    value: lang
                });
            }
        });
        return available;
    }

    getAvailableDescriptionLanguages = () => {
        const languages = this.state.languages;
        const available = [];
        languages.forEach((lang) => {
            let exists = false;
            for(let i = 0; i < this.state.descriptions.length; i++) {
                const desc = this.state.descriptions[i];
                if(desc.language_code === lang.Code) {
                    exists = true;
                    break;
                }
            }
            if(!exists) {
                available.push({
                    label: lang.Name,
                    value: lang
                });
            }
        });
        return available;
    }

    render() {
        return (
            <div>
                 <Dialog
                    fullScreen
                    className={getTheme()}
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className="topbar">
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flex: 1}}>
                            {this.state.id ? strings.PROJECT_EDIT : strings.PROJECTS_NEW_PROJECT}
                        </Typography>
                        {this.state.id && <Button style={{marginRight: 15}} className="button-danger-outlined" variant="outlined" onClick={this.openConfirmDelete}>
                            {strings.DELETE}
                        </Button>}
                        <Button color="secondary" variant="contained" onClick={this.handleSave}>
                            {strings.SAVE}
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className="dialog-content">
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                        <div className="title-div">
                                            <h1>{strings.TITLES}</h1>
                                            <FormControl fullWidth>
                                                <Selector
                                                    options={this.getAvailableTitleLanguages()}
                                                    value={""}
                                                    placeholder={strings.ADD_TRANSLATION}
                                                    onChange={this.onTitleLanguageAdd}
                                                />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    {this.state.titles.map((title, i) => (
                                        <Grid key={i} item xs={12} md={8}>
                                            <TextField
                                                label={title.language_name}
                                                variant="outlined"
                                                value={title.content}
                                                onChange={e => this.handleChangeTitle(e, i)}
                                                margin="dense"
                                                fullWidth
                                                multiline
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment className="remove-button" position="end">
                                                        {this.state.titles.length > 1 && <RemoveCircle
                                                            onClick={() => this.handleTitleRemove(i)}
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
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                        <div className="title-div">
                                            <h1>{strings.DESCRIPTIONS}</h1>
                                            <FormControl fullWidth>
                                                <Selector
                                                    options={this.getAvailableDescriptionLanguages()}
                                                    value={""}
                                                    placeholder={strings.ADD_TRANSLATION}
                                                    onChange={this.onDescriptionLanguageAdd}
                                                />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    {this.state.descriptions.map((desc, i) => (
                                        <Grid key={i} item xs={12} md={8}>
                                            <TextField
                                                label={desc.language_name}
                                                variant="outlined"
                                                multiline
                                                value={desc.content}
                                                onChange={e => this.handleChangeDescription(e, i)}
                                                margin="dense"
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                    <InputAdornment className="remove-button" position="end">
                                                        {this.state.descriptions.length > 1 && <RemoveCircle
                                                            onClick={() => this.handleDescriptionRemove(i)}
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
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h1>{strings.PROJECT_URL}</h1>
                            <TextField
                                label={"URL"}
                                variant="outlined"
                                value={this.state.url}
                                onChange={e => this.setState({
                                    url: e.target.value
                                })}
                                fullWidth
                                margin="dense"
                            />
                        </Grid>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.handleConfirmClose}
                    >
                    <DialogTitle>{strings.DELETE_PROJECT}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_PROJECT_DESCRIPTION}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmClose} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deleteProject} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(EditProject);