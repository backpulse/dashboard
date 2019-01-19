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
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import strings from 'strings';
import Selector from 'components/Selector';

import FileUploader from 'components/FileUploader';

import client from 'services/client';

import './styles.scss';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class Galleries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            galleries : [],

            titles: [],
            descriptions: [],
            languages: [],
            newGalleryDialog: false,

            importDialog: false
        }
    }

    componentDidMount() {
        this.fetchGalleries();
    }

    fetchGalleries = () => {
        client.get('/galleries/' + this.props.match.params.name).then(response => {
            const galleries = response.data.payload;
            this.setState({galleries});
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

    handleNewGallery = () => {
        this.fetchLanguages();
        this.setState({
            newGalleryDialog: true,
            id: "",
            short_id: "",
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

    handleClose = () => this.setState({
        newGalleryDialog: false
    });

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

    toggleImport = () => this.setState({
        importDialog: !this.state.importDialog
    })
    

    render() {
        return (
            <div className="page dashboard-galleries">
                <Fab onClick={this.handleNewGallery} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_GALLERY}
                </Fab>
                <h1>{strings.DRAWER_GALLERIES}</h1>

                <Dialog
                    fullScreen
                    open={this.state.newGalleryDialog}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className="topbar">
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flex: 1}}>
                            {this.state.id ? strings.PROJECT_EDIT : strings.NEW_GALLERY}
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
                            <Grid item md={5} xs={12}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={10}>
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
                                        <Grid key={i} item md={10}>
                                            <TextField
                                                label={title.language_name}
                                                variant="outlined"
                                                value={title.content}
                                                onChange={e => this.handleChangeTitle(e, i)}
                                                margin="dense"
                                                multiline
                                                fullWidth
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
                                <Grid container direction="column">
                                    <Grid style={{marginTop: 15}} item xs={12} md={10}>
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
                                        <Grid key={i} item xs={12} md={10}>
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
                            <Grid item md={7} xs={12}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                    <div className="title-div">
                                        <h1>{strings.PHOTOS}</h1>
                                        <Button onClick={this.toggleImport} size="large" variant="contained" color="primary">Importer</Button>
                                        <FileUploader open={this.state.importDialog} close={this.toggleImport}/>
                                    </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Galleries);