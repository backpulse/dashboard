import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {withRouter} from 'react-router';

import client from 'services/client';

import strings from 'strings';

import './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {sortByIndex} from 'utils';
import FileSelector from 'components/FileSelector';
import InputAdornment from '@material-ui/core/InputAdornment';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import Sorter from 'components/Sorter';

import Track from 'components/Track';

class Album extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            createAlbum: false,

            title: "",
            cover: "",

            trackTitle: "",
            trackImage: "",
            trackUrl: "",
            
            fileSelector: false,
            tracks: [],
            confirmDelete: false
        }
    }

    fetchAlbum = () => {
        this.setState({fetched: false});
        client.get('/albums/' + this.props.match.params.name + '/' + this.props.match.params.id).then(response => {
            const album = response.data.payload;
            album.tracks = sortByIndex(album.tracks) || [];
            this.setState({...album, fetched: true});
            console.log(album);
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchAlbum();
    }

    onDragEnd = tracks => {
        this.setState({tracks});
        client.put('/tracks/' + this.props.match.params.name + '/indexes', tracks).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    onImageSelected = file => {
        this.setState({trackImage: file.url});
        this.closeFileSelector();
    }

    onAudioSelected = file => {
        this.setState({trackUrl: file.url});
        this.closeAudioSelector();
    }

    closeFileSelector = () => this.setState({
        fileSelector: false
    });

    openFileSelector = () => this.setState({
        fileSelector: true
    });

    closeAudioSelector = () => this.setState({
        audioSelector: false
    });

    openAudioSelector = () => this.setState({
        audioSelector: true
    });

    closeDelete = () => this.setState({
        confirmDelete: false
    });

    deleteTrack = () => {
        client.delete('/tracks/' + this.props.match.params.name + '/' + this.state.trackToDelete.id).then(response => {
            console.log(response.data);
            this.fetchAlbum();
            this.closeDelete();
        }).catch(err => {
            if(err) throw err;
        });
    }

    openCreateDialog = () => this.setState({
        createTrack: true
    });

    handleClose = () => this.setState({
        createTrack: false
    });

    createTrack = e => {
        e.preventDefault();
        client.post('/tracks/' + this.props.match.params.name + '/' + this.props.match.params.id, {
            title: this.state.trackTitle,
            image: this.state.trackImage,
            url: this.state.trackUrl
        }).then(response => {
            console.log(response.data);
            this.fetchAlbum();
            this.handleClose();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-album">
                <div className="title-div">
                    <h1>{strings.EDIT_ALBUM}</h1>
                </div>
                {!this.state.fetched && <CircularProgress className="progress"/>}
                <Fab onClick={this.openCreateDialog} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_TRACK}
                </Fab>
                {this.state.tracks.length < 1 && this.state.fetched && <Button onClick={this.openCreateDialog} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_TRACK}
                </Button>}
                <Sorter 
                    className="tracks-container" 
                
                    onDragEnd={this.onDragEnd} 
                    component={Track} 
                    items={this.state.tracks}

                    onEdit={this.editTrack}
                    onDelete={t => this.setState({
                        confirmDelete: true,
                        trackToDelete: t,
                    })} 
                />

                <FileSelector 
                    close={this.closeFileSelector} 
                    open={this.state.fileSelector}
                    onFileSelected={this.onImageSelected}
                    accept={"image"}
                />
                <FileSelector 
                    close={this.closeAudioSelector} 
                    open={this.state.audioSelector}
                    onFileSelected={this.onAudioSelected}
                    accept={"audio"}
                />

                <Dialog
                    fullWidth
                    open={this.state.createTrack}
                    onClose={this.handleClose}
                    className="edit-track-dialog"
                    >
                    <form onSubmit={this.createTrack}>
                        <DialogTitle>{strings.ADD_TRACK}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.ADD_TRACK_DESC}
                            </DialogContentText>
                            <TextField
                                required
                                autoFocus
                                margin="dense"
                                value={this.state.trackTitle}
                                onChange={e => this.setState({
                                    trackTitle: e.target.value
                                })}
                                label={strings.TITLE}
                                fullWidth
                            />
                            <TextField
                                label={strings.AUDIO_FILE}
                                value={this.state.trackUrl}
                                onChange={e=>this.setState({trackUrl: e.target.value})}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={this.openAudioSelector}>
                                            <StorageIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                            <TextField
                                label={strings.IMAGE}
                                value={this.state.trackImage}
                                onChange={e=>this.setState({trackImage: e.target.value})}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={this.openFileSelector}>
                                            <StorageIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                        {this.state.trackImage.length > 2 && <img alt="cover" src={this.state.trackImage}/>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.ADD_TRACK}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeDelete}
                    >
                    <DialogTitle>{strings.DELETE_TRACK}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.DELETE_TRACK_DESC}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDelete} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deleteTrack} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Album);