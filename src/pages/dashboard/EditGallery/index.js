import React from 'react';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

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
import Fab from '@material-ui/core/Fab';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import PhotoBox from 'components/PhotoBox';

import FileUploader from 'components/FileUploader';

import client from 'services/client';

import {withRouter} from 'react-router';

import './styles.scss';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class EditGallery extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            descriptions: [],
            languages: [],
            photos: [],
            open: true,

            importDialog: false,
            confirmDelete: false
        }
    }

    componentDidMount() {
        this.fetchLanguages();
        this.fetchGallery(this.props.match.params.id);
    }

    fetchGallery = id => {
        client.get('/gallery/'+ id).then(response => {
            const gallery =response.data.payload;
            gallery.photos = gallery.photos || [];
            this.setState({...gallery});
            console.log(gallery);
        }).catch(err => {
            if(err) throw err;
        });
    }
    
    deleteGallery = () => {
        client.delete('/gallery/' + this.state.short_id).then(response => {
            console.log(response.data);
            this.handleClose();
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

    

    handleClose = () => {
        this.setState({open: false});
        setTimeout(() => {
            this.props.history.replace('/site/' + this.props.match.params.name + '/galleries');
        }, 250);
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
    
    onUploadFinished = photos => {
        this.toggleImport();
        this.fetchGallery(this.props.match.params.id);
    }

    handleSave = () => {
        client.put('/gallery/' + this.state.short_id, {
            titles: this.state.titles,
            descriptions: this.state.descriptions
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

    deletePhoto = photo => {
        client.delete('/photos/' + photo.id).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    fullScreen
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
                        <Fab className="fab" onClick={this.toggleImport} variant="extended" color="primary">
                            <AddIcon/>
                            Importer
                        </Fab>
                    <DialogContent className="dialog-content dialog-gallery-edit">
                    
                        <Grid container spacing={16}>
                            <Grid item md={7} xs={12}>
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
                            <Grid item md={5} xs={12}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                        <div className="title-div">
                                            <h1>{strings.PHOTOS}</h1>
                                        </div>
                                    </Grid>
                                    <FileUploader isGallery galleryID={this.state.short_id} onDone={this.onUploadFinished} open={this.state.importDialog} close={this.toggleImport}/>
                                    <div className="gallery-photos-container">
                                        {this.state.photos.map((photo, i) => (
                                            <Grid key={i} item xs={12} md={10}>
                                                <PhotoBox onDelete={() => this.deletePhoto(photo)} previewButton className="padding-10" editing src={photo.url}/>
                                            </Grid>
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.handleConfirmClose}
                    >
                    <DialogTitle>{strings.DELETE_GALLERY}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_GALLERY_DESCRIPTION}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmClose} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button size="large" onClick={this.deleteGallery} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(EditGallery);