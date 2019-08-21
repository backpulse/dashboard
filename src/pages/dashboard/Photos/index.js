import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import strings from 'strings';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';
import client from 'services/client';

import CircularProgress from '@material-ui/core/CircularProgress';

import PhotoBox from 'components/PhotoBox';

import './styles.scss';

import Sorter from '../../../components/Sorter';

import {sortByIndex} from 'utils';

class Photos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos : [],
            photoName: "",
            photo: "",
            fetched: false,
            loading: false,
            newPhotoDialog: false,
            confirmDelete: false,
            gallery: "none",
            galleries: []

        }
    }

    componentDidMount() {
        this.fetchGalleries();
        this.fetchPhotos();
    }

    componentWillReceiveProps() {
        this.fetchGalleries();
        this.fetchPhotos();
    }

    fetchGalleries = () => {
        client.get('/galleries/'+ this.props.match.params.name).then(response => {
            const galleries = response.data.payload || [];
            this.setState({
                galleries
            });
        }).catch(err => {
            if(err) throw err;
        });
    }

    fetchPhotos = () => {
        client.get('/photos/' + this.props.match.params.name).then(response => {
            const photos = response.data.payload || [];
            console.log(photos);
            photos.reverse();
            // sortByIndex(photos);
            this.setState({photos, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleNewPhoto = () => {
        this.setState({ photoName: "",newPhotoDialog: true, error: false, errorMsg: "", nameHasError: false});
    }

    createPhoto = e => {
        e.preventDefault();
        const data = {
            gallery_id: this.state.gallery,
            title: this.state.photoName
        }
        if(data.gallery_id === "none") data.gallery_id = null;

        client.post('/photos/' + this.props.match.params.name + '/create', data).then(response => {
            console.log(response.data.payload);
            this.handleCloseNewPhotoDialog();
            this.fetchPhotos();
        }).catch(err => {
            if(err) throw err;
        });
    }
    
    checkError = err => {
        const errType = err.data.message;
        switch(errType) {
            case "name_too_short": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.NAME_TOO_SHORT,
                    error: true
                });
                break;
            }
            case "name_too_long": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.NAME_TOO_LONG,
                    error: true
                });
                break;
            }
            default:
                break
        }
    }

    handleCloseNewPhotoDialog = () => this.setState({
        newPhotoDialog: false
    });

    editPhoto = photo => {
        this.props.history.push('/site/' + this.props.match.params.name + '/photos/' + photo.id);
    }

    handleNameChange = e => this.setState({
        photoName: e.target.value
    });

    onDragEnd = photos => {
        this.setState({photos});
        client.put('/photos/' + this.props.match.params.name + '/indexes', photos).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    closeConfirmDelete = () => this.setState({
        confirmDelete: false
    });

    confirmDelete = photo => this.setState({
        confirmDelete: true,
        photoToDelete: photo
    });

    deletePhoto = () => {
        client.delete('/photos/' + this.state.photoToDelete.id).then(response => {
            this.closeConfirmDelete();
            this.fetchPhotos();
        }).catch(err => {
            if(err) throw err;
        });
    }

    onDefaultSet = photo => {
        client.put('/photos/' + this.props.match.params.name + '/default/' + photo.id).then(response => {
            console.log(response.data);
            this.fetchPhotos();
        }).catch(err => {
            if(err) throw err;
        });
    }

    onGallerychange = e => {
        this.setState({gallery: e.target.value});
    }

    render() {
        return (
            <div className="page dashboard-photos">
                <Fab onClick={this.handleNewPhoto} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_PHOTO}
                </Fab>
                <div className="title-div">
                    <h1>{strings.PHOTOS}</h1>
                </div>
                {!this.state.fetched && <CircularProgress/>}
                {this.state.photos.length < 1 && this.state.fetched && <Button onClick={this.handleNewPhoto} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_PHOTO}
                </Button>}

                {this.state.photos.length > 0 && 
                    <Sorter 
                        className="photos-container" 
                    
                        onDragEnd={this.onDragEnd} 
                        component={PhotoBox} 
                        items={this.state.photos}

                        loading={this.state.loading}
                        onEdit={g => this.editPhoto(g)}
                        onDelete={g => this.confirmDelete(g)}
                        onDefaultSet={g => this.onDefaultSet(g)}
                    />
                }

                <Dialog
                    open={this.state.newPhotoDialog}
                    onClose={this.handleCloseNewPhotoDialog}
                    fullWidth
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.createPhoto}>
                        <DialogTitle id="form-dialog-title">{strings.NEW_PHOTO}</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    error={this.state.nameHasError}
                                    required
                                    onChange={this.handleNameChange}
                                    autoFocus
                                    value={this.state.photoName}
                                    margin="dense"
                                    label={strings.TITLE}
                                    fullWidth
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <FormHelperText>{strings.GALLERY}</FormHelperText>
                                <Select label={strings.GALLERY} onChange={this.onGallerychange} value={this.state.gallery}>
                                    <MenuItem value={"none"}>
                                        {strings.NONE}
                                    </MenuItem>
                                    {this.state.galleries.map((g, i) => (
                                        <MenuItem key={i} value={g.id}>
                                            {g.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseNewPhotoDialog} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.CREATE}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeConfirmDelete}
                    >
                    <DialogTitle>{strings.DELETE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_PHOTO}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirmDelete} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deletePhoto} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Photos);