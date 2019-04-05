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

import Album from '../../../components/Album';

import './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {sortByIndex} from 'utils';
import FileSelector from 'components/FileSelector';
import InputAdornment from '@material-ui/core/InputAdornment';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import Sorter from 'components/Sorter';

class Albums extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            fetched: false,
            createAlbum: false,

            title: "",
            cover: "",
            fileSelector: false,

            confirmDelete: false
        }
    }

    fetchAlbums = () => {
        this.setState({fetched: false});
        client.get('/albums/' + this.props.match.params.name).then(response => {
            const albums = response.data.payload || [];
            sortByIndex(albums);
            this.setState({albums, fetched: true});
            console.log(albums);
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchAlbums();
    }

    handleClose = () => this.setState({
        createAlbum: false
    });

    openCreateDialog = () => this.setState({
        createAlbum: true
    });


    onDragEnd = albums => {
        this.setState({albums});
        client.put('/albums/' + this.props.match.params.name + '/indexes', albums).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });

    }

    createAlbum = e => {
        e.preventDefault();
        client.post('/albums/' + this.props.match.params.name, {
            title: this.state.title,
            cover: this.state.cover,
        }).then(response => {
            console.log(response.data);
            this.fetchAlbums();
            this.handleClose();
        }).catch(err => {
            if(err) throw err;
        });
    }

    onImageSelected = file => {
        this.setState({cover: file.url});
        this.closeFileSelector();
    }

    closeFileSelector = () => this.setState({
        fileSelector: false
    });

    openFileSelector = () => this.setState({
        fileSelector: true
    });

    closeDelete = () => this.setState({
        confirmDelete: false
    });

    deleteAlbum = () => {
        client.delete('/albums/' + this.props.match.params.name + '/' + this.state.albumToDelete.id).then(response => {
            console.log(response.data);
            this.fetchAlbums();
            this.closeDelete();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-albums">
                <div className="title-div">
                    <h1>{strings.MODULE_MUSIC}</h1>
                </div>
                {!this.state.fetched && <CircularProgress className="progress"/>}
                <Fab onClick={this.openCreateDialog} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.CREATE_ALBUM}
                </Fab>
                {this.state.albums.length < 1 && this.state.fetched && <Button onClick={this.openCreateDialog} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.CREATE_ALBUM}
                </Button>}
                <Sorter 
                    className="albums-container" 
                
                    onDragEnd={this.onDragEnd} 
                    component={Album} 
                    items={this.state.albums}

                    onEdit={this.editAlbum}
                    onDelete={a => this.setState({
                        confirmDelete: true,
                        albumToDelete: a,
                    })} 
                />

                <FileSelector 
                    close={this.closeFileSelector} 
                    open={this.state.fileSelector}
                    onFileSelected={this.onImageSelected}
                />

                <Dialog
                    fullWidth
                    open={this.state.createAlbum}
                    onClose={this.handleClose}
                    className="edit-album-dialog"
                    >
                    <form onSubmit={this.createAlbum}>
                        <DialogTitle>{strings.CREATE_ALBUM}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.CREATE_ALBUM_DESC}
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                value={this.state.title}
                                onChange={e => this.setState({
                                    title: e.target.value
                                })}
                                label={strings.TITLE}
                                fullWidth
                            />
                            <TextField
                                label={strings.COVER}
                                value={this.state.cover}
                                onChange={e=>this.setState({cover: e.target.value})}
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
                        {this.state.cover.length > 2 && <img alt="cover" src={this.state.cover}/>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.CREATE_ALBUM}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeDelete}
                    >
                    <DialogTitle>{strings.DELETE_ALBUM}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_ALBUM_DESC}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDelete} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deleteAlbum} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Albums);