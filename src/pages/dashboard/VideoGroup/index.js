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
            confirmDelete: false
        }
    }

    fetchGroup = () => {
        const id = this.props.match.params.id;
        this.setState({fetched: false});
        client.get('/videogroups/'+this.props.match.params.name + '/' + id).then(response => {
            const group = response.data.payload;
            group.videos = group.videos || [];

            sortByIndex(group.videos);
            this.setState({group, fetched: true});
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

    render() {
        return (
            <div className="page dashboard-videogroup">
                <h1>{this.state.group.title}</h1>
                <Fab onClick={this.addVideo} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_VIDEO}
                </Fab>
                {!this.state.fetched && <CircularProgress className="progress"/>}


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

export default withRouter(VideoGroup);