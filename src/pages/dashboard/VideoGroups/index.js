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

import VideoGroup from '../../../components/VideoGroup';

import './styles.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import {sortByIndex} from 'utils';

import Sorter from 'components/Sorter';

class Videos extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            fetched: false,
            groups: [],
            title: "",
            addVideoGroup: false,
            confirmDelete: false
        }
    }

    fetchVideoGroups = () => {
        this.setState({fetched: false});
        client.get('/videogroups/' + this.props.match.params.name).then(response => {
            const groups = response.data.payload || [];
            sortByIndex(groups);
            this.setState({groups, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    openAddVideoGroup = () => this.setState({
        addVideoGroup: true
    });

    handleClose = () => this.setState({
        addVideoGroup: false
    });

    addVideoGroup = e => {
        e.preventDefault();
        client.post('/videogroups/' + this.props.match.params.name, {
            title: this.state.title
        }).then(response => {
            this.fetchVideoGroups();
            this.handleClose();
            this.setState({
                title: ""
            })
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentWillMount() {
        this.fetchVideoGroups();
    }

    closeConfirm = () => this.setState({
        confirmDelete: false
    });


    editGroup = group => {
        this.props.history.push('/site/' + this.props.match.params.name + '/videogroups/' + group.id);
    }

    deleteGroup = () => {
        client.delete('/videogroups/' + this.props.match.params.name + '/' + this.state.groupToDelete.id).then(response => {
            console.log(response.data);
            this.fetchVideoGroups();
            this.closeConfirm();

        }).catch(err => {
            if(err) throw err;
        });
    }

    onDragEnd = groups => {
        this.setState({groups});
        client.put('/videogroups/' + this.props.match.params.name + '/indexes', groups).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-videogroups">
                <h1>{strings.VIDEO_GROUPS}</h1>
                {!this.state.fetched && <CircularProgress className="progress"/>}
                <Fab onClick={this.openAddVideoGroup} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_VIDEO_GROUP}
                </Fab>

                <Sorter 
                    className="groups-container" 
                
                    onDragEnd={this.onDragEnd} 
                    component={VideoGroup} 
                    items={this.state.groups}

                    onEdit={g => this.editGroup(g)}
                    onDelete={g => this.setState({
                        confirmDelete: true,
                        groupToDelete: g,
                    })} 
                />

                <Dialog
                    fullWidth
                    open={this.state.addVideoGroup}
                    onClose={this.handleClose}
                    >
                    <form onSubmit={this.addVideoGroup}>
                        <DialogTitle>{strings.ADD_VIDEO_GROUP}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.ADD_VIDEO_GROUP_DESC}
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.ADD_VIDEO_GROUP}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeConfirm}
                    >
                    <DialogTitle>{strings.DELETE_VIDEO_GROUP}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.DELETE_VIDEO_GROUP_DESC}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirm} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button onClick={this.deleteGroup} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Videos);