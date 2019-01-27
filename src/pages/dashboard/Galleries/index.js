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
import DialogActions from '@material-ui/core/DialogActions';
import client from 'services/client';

import CircularProgress from '@material-ui/core/CircularProgress';

import GalleryBox from 'components/GalleryBox';

import './styles.scss';


class Galleries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            galleries : [],
            fetched: false,
            titles: [],
            descriptions: [],
            languages: [],
            photos: [],
            editGalleryDialog: false,
            newGalleryDialog: false,
            galleryName: "",
            importDialog: false,
            confirmDelete: false,
            nameHasError: false,
            error: false,
            errorMsg: ""
        }
    }

    componentDidMount() {
        this.fetchGalleries();
    }

    componentWillReceiveProps() {
        this.fetchGalleries();
    }


    fetchGalleries = () => {
        client.get('/galleries/' + this.props.match.params.name).then(response => {
            const galleries = response.data.payload || [];
            this.setState({galleries, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleCreateGallery = () => {
        this.setState({ galleryName: "",newGalleryDialog: true, error: false, errorMsg: "", nameHasError: false});
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

    handleCloseNewGalleryDialog = () => this.setState({
        newGalleryDialog: false
    });

    createGallery = e => {
        e.preventDefault();
        client.post('/galleries/'+this.props.match.params.name + '/' + this.state.galleryName).then(response => {
            this.fetchGalleries();
            this.handleCloseNewGalleryDialog();
            const gallery = response.data.payload;
            this.editGallery(gallery.short_id);
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        })
    }

    editGallery = id => {
        this.props.history.push('/site/' + this.props.match.params.name + '/galleries/' + id);
    }

    handleNameChange = e => this.setState({
        galleryName: e.target.value
    });

    render() {
        return (
            <div className="page dashboard-galleries">
                <Fab onClick={this.handleCreateGallery} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_GALLERY}
                </Fab>
                <div className="title-div">
                    <h1>{strings.DRAWER_GALLERIES}</h1>
                </div>
                {!this.state.fetched && <CircularProgress/>}
                {this.state.galleries.length < 1 && this.state.fetched && <Button onClick={this.handleCreateGallery} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_GALLERY}
                </Button>}
                <div className="galleries-container">
                    {this.state.galleries.map((gallery, i) => {
                        return <GalleryBox key={i} onOpen={() => this.editGallery(gallery.short_id)} gallery={gallery}/>;
                    })}
                </div>

                <Dialog
                    open={this.state.newGalleryDialog}
                    onClose={this.handleCloseNewGalleryDialog}
                    fullWidth
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.createGallery}>
                        <DialogTitle id="form-dialog-title">{strings.NEW_GALLERY}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.NEW_GALLERY_DESCRIPTION}
                            </DialogContentText>
                            <FormControl fullWidth>
                                <TextField
                                    error={this.state.nameHasError}
                                    required
                                    onChange={this.handleNameChange}
                                    autoFocus
                                    value={this.state.galleryName}
                                    margin="dense"
                                    label={strings.NEW_GALLERY_NAME}
                                    fullWidth
                                />
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseNewGalleryDialog} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.CREATE}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Galleries);