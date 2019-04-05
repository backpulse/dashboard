import React from 'react';

import {withRouter} from 'react-router';

import strings from 'strings';

import client from 'services/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import DialogContentText from '@material-ui/core/DialogContentText';

import './styles.scss';

import Video from 'components/Video';
import {sortByIndex} from 'utils';

import Sorter from 'components/Sorter';
import FileSelector from 'components/FileSelector';
import InputAdornment from '@material-ui/core/InputAdornment';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import { withSnackbar } from 'notistack';

class VideoGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            group: {
                title: "",
                videos: []
            },
            addVideo: false,
            url: "",
            error: false,
            errorMsg: "",
            videoToDelete: {},
            confirmDelete: false,

            fileSelector: false,
            editGroup: false,

            newTitle: "",
            newImage: ""
        }
    }

    fetchGroup = () => {
        const id = this.props.match.params.id;
        this.setState({fetched: false});
        client.get('/videogroups/'+this.props.match.params.name + '/' + id).then(response => {
            const group = response.data.payload;
            group.videos = group.videos || [];

            sortByIndex(group.videos);
            this.setState({
                group,
                newImage: group.image || "",
                newTitle: group.title,
                fetched: true
            });
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchGroup();
    }

    addVideo = () => this.setState({
        addVideo: true
    });

    closeAddVideo = () => this.setState({
        addVideo: false
    });

    createVideo = () => {
        client.post('/videos/' + this.props.match.params.name + '/' + this.props.match.params.id, {
            youtube_url: this.state.url
        }).then(response => {
            console.log(response.data);
            this.fetchGroup();
            this.closeAddVideo();
            this.setState({
                error: false
            });
        }).catch(err => {
            this.setState({
                error: true,
                errorMsg: strings.INVALID_URL
            })
            if(err) throw err;
        });
    }

    editVideo = video => {
        this.props.history.push('/site/' + this.props.match.params.name + '/videogroups/' + this.state.group.id + '/' + video.id);
    }

    closeDelete = () => this.setState({
        confirmDelete: false
    });

    deleteVideo = () => {
        client.delete('/videos/' + this.props.match.params.name + '/' + this.state.videoToDelete.id).then(response => {
            console.log(response.data);
            this.fetchGroup();
            this.closeDelete();
        }).catch(err => {
            if(err) throw err;
        });
    }

    onDragEnd = videos => {
        const group = this.state.group;
        group.videos = videos;
        this.setState({group});
        client.put('/videos/' + this.props.match.params.name + '/indexes', videos).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });

    }

    onImageSelected = file => {
        console.log(file);
        this.setState({newImage: file.url});
        this.closeFileSelector();
    }

    closeFileSelector = () => this.setState({
        fileSelector: false
    });

    openFileSelector = () => this.setState({
        fileSelector: true
    });

    editVideoGroup = () => this.setState({
        editGroup: true
    });

    closeEdit = () => this.setState({
        editGroup: false
    });

    saveGroup = () => {
        client.put('/videogroups/' + this.props.match.params.name + '/' + this.props.match.params.id, {
            title: this.state.newTitle,
            image: this.state.newImage
        }).then(response => {
            console.log(response.data);
            this.closeEdit();
            this.props.enqueueSnackbar(strings.SAVED, {variant: "success"});
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-videogroup">
                {this.state.fetched && <div className="title-div"> 
                    <h1>{this.state.group.title}</h1>
                    <Button onClick={this.editVideoGroup} size="small" color="primary" variant="contained">
                        {strings.EDIT}
                    </Button>
                </div>}
                <Fab onClick={this.addVideo} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_VIDEO}
                </Fab>
                {!this.state.fetched && <CircularProgress className="progress"/>}

                <FileSelector 
                    close={this.closeFileSelector} 
                    open={this.state.fileSelector}
                    onFileSelected={this.onImageSelected}
                />

                <Sorter 
                    className="videos-container" 
                
                    onDragEnd={this.onDragEnd} 
                    component={Video} 
                    items={this.state.group.videos}

                    onEdit={video => this.editVideo(video)}
                    onDelete={video => this.setState({
                        videoToDelete: video,
                        confirmDelete: true
                    })}
                />

                <Dialog
                    open={this.state.editGroup}
                    onClose={this.closeEdit}
                    fullWidth
                    className="edit-group-dialog"
                    >
                    <DialogTitle>{strings.EDIT_VIDEO_GROUP}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={this.state.newTitle}
                            onChange={e => this.setState({
                                newTitle: e.target.value
                            })}
                            label={strings.TITLE}
                            fullWidth
                        />
                        <TextField
                            error={this.state.errorField === "name"}
                            label={strings.IMAGE}
                            value={this.state.newImage}
                            onChange={e=>this.setState({newImage: e.target.value})}
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
                        <img alt="preview" src={this.state.newImage}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeEdit} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.saveGroup} color="primary" variant="contained">
                            {strings.SAVE}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.addVideo}
                    onClose={this.closeAddVideo}
                    fullWidth
                    >
                    <DialogTitle>{strings.ADD_VIDEO}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            value={this.state.url}
                            onChange={e => this.setState({
                                url: e.target.value
                            })}
                            label={strings.YOUTUBE_URL}
                            fullWidth
                            error={this.state.error}
                        />
                        {this.state.error && <FormHelperText error={true}>
                            {this.state.errorMsg}
                        </FormHelperText>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeAddVideo} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.createVideo} color="primary" variant="contained">
                            {strings.ADD_VIDEO}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeDelete}
                    >
                    <DialogTitle>{strings.DELETE_VIDEO}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_VIDEO_DESC}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDelete} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deleteVideo} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(withSnackbar(VideoGroup));