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

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import CircularProgress from '@material-ui/core/CircularProgress';

import GalleryBox from 'components/GalleryBox';

import './styles.scss';

import {reorder, sortByIndex} from 'utils';


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
            errorMsg: "",
            galleryToDelete: {},

            loading: false
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
            sortByIndex(galleries);
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

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            this.state.galleries,
            result.source.index,
            result.destination.index
        );
    
        this.setState({
            galleries: items,
        });

        this.updateIndexes(items);
    }

    updateIndexes = galleries => {
        const items = galleries.map((g, i) => ({
            id: g.id,
            index: i
        }));

        console.log(items);
        client.put('/galleries/' + this.props.match.params.name + '/indexes', items).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    closeConfirmDelete = () => this.setState({
        confirmDelete: false
    });

    confirmDelete = gallery => this.setState({
        confirmDelete: true,
        galleryToDelete: gallery
    });

    deleteGallery = () => {
        client.delete('/gallery/' + this.state.galleryToDelete.short_id).then(response => {
            this.closeConfirmDelete();
            this.fetchGalleries();
        }).catch(err => {
            if(err) throw err;
        });
    }

    onDefaultSet = gallery => {
        client.put('/galleries/' + this.props.match.params.name + '/default/' + gallery.short_id).then(response => {
            console.log(response.data);
            this.fetchGalleries();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-galleries">
                <Fab onClick={this.handleCreateGallery} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_GALLERY}
                </Fab>
                <div className="c-div">
                    <div className="title-div">
                        <h1>{strings.DRAWER_GALLERIES}</h1>
                    </div>
                    {!this.state.fetched && <CircularProgress/>}
                    {this.state.galleries.length < 1 && this.state.fetched && <Button onClick={this.handleCreateGallery} variant="contained" color="primary" aria-label="Add">
                        <AddIcon />
                        {strings.NEW_GALLERY}
                    </Button>}
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {provided => (
                                <div ref={provided.innerRef} className="galleries-container">
                                    {this.state.galleries.map((gallery, i) => (
                                        <Draggable key={i} draggableId={gallery.id} index={i}>
                                            {provided => (
                                            <div
                                                className="draggable"
                                                ref={provided.innerRef} 
                                                {...provided.draggableProps} 
                                                {...provided.dragHandleProps}>
                                                <GalleryBox
                                                    loading={this.state.loading}
                                                    onDefaultSet={() => this.onDefaultSet(gallery)}
                                                    onDelete={() => this.confirmDelete(gallery)}
                                                    onOpen={() => this.editGallery(gallery.short_id)} 
                                                    gallery={gallery}
                                                />
                                            </div>
                                            )}
                                        </Draggable>
                                    )
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>

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

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeConfirmDelete}
                    >
                    <DialogTitle>{strings.DELETE_GALLERY}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_GALLERY_DESCRIPTION}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirmDelete} color="primary" autoFocus>
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

export default withRouter(Galleries);