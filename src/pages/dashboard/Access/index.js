import React from 'react';

import strings from 'strings';

import AddIcon from '@material-ui/icons/Add';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Divider from '@material-ui/core/Divider';

import client from 'services/client';

import {withRouter} from 'react-router';

import './styles.scss';
import { getUser } from 'utils/token';
import { Typography } from '@material-ui/core';

class Access extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            collaborators: [],
            email: "",

            error: false,
            errorMsg: "",

            removeDialog: false,
            fetched: false
        }
    }

    fetchCollaborators = () => {
        client.get('/sites/' + this.props.match.params.name + '/collaborators').then(response => {
            const collaborators = response.data.payload || [];
            this.setState({collaborators, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    checkError = err => {
        const errType = err.data.message;
        switch(errType) {
            case "exists": {
                this.setState({
                    errorMsg: strings.COLLABORATOR_EXISTS,
                    error: true
                });
                break;
            }
            case "incorrect_email": {
                this.setState({
                    errorMsg: strings.EMAIL_INCORRECT,
                    error: true
                });
                break;
            }
            case "upgrade_account": {
                this.setState({
                    errorMsg: strings.PLEASE_UPGRADE,
                    error: true
                });
                break;
            }
            default:
                break
        }
    }

    componentDidMount() {
        this.fetchCollaborators();
    }

    handleNewCollaborator = () => this.setState({
        open: true,
        error: false,
        errorMsg: ""
    });

    handleClose = () => this.setState({
        open: false
    });

    inviteUser = e => {
        e.preventDefault();
        client.post('/sites/' + this.props.match.params.name + '/collaborators/' + this.state.email).then(response => {
            this.handleClose();
            this.fetchCollaborators();
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        });
    }

    removeCollaborator = c => {
        client.delete('/sites/' + this.props.match.params.name + '/collaborators/' + this.state.collabToDelete.email).then(response => {
            this.fetchCollaborators();
            this.handleRemoveClose();
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleRemoveClose = () => this.setState({
        removeDialog: false
    });

    isOwner = () => {
        const collabs = this.state.collaborators;
        for(let i = 0; i < collabs.length; i++) {
            if(collabs[i].email === getUser().email) {
                if(collabs[i].role === "owner") {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        return (
            <div className="page dashboard-access">
                <h1>{strings.DRAWER_ACCESS}</h1>

                <Button disabled={!this.isOwner()} onClick={this.handleNewCollaborator} className="new-collab-button" variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_COLLABORATOR}
                </Button>
                {!this.state.fetched && <CircularProgress style={{display: "block"}}/>}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth>
                    <form onSubmit={this.inviteUser}>
                        <DialogTitle>{strings.ADD_COLLABORATOR}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.ADD_COLLABORATOR_DESCRIPTION}
                            </DialogContentText>
                            <FormControl fullWidth>
                                <TextField
                                    error={this.state.error}
                                    required
                                    onChange={e => this.setState({
                                        email: e.target.value
                                    })}
                                    type="email"
                                    autoFocus
                                    margin="dense"
                                    label={strings.EMAIL}
                                    fullWidth
                                />
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.INVITE}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Dialog
                    open={this.state.removeDialog}
                    onClose={this.handleRemoveClose}
                    >
                    <DialogTitle>{strings.REMOVE_COLLABORATOR}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        {strings.REMOVE_COLLABORATOR_DESCRIPTION}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRemoveClose} autoFocus color="primary">
                            {strings.CANCEL}
                        </Button>
                        <Button className="button-danger" onClick={this.removeCollaborator}>
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
                {this.state.fetched && 
                    <List className="collab-list">
                        {this.state.collaborators.map((c, i) => (
                            <ListItem style={{paddingLeft: 5}} key={i} dense>
                                <AccountCircle fontSize="large" color="primary"/>
                                <ListItemText primary={c.email} secondary={c.role === "collaborator" ? strings.COLLABORATOR.toLowerCase() : strings.OWNER.toLowerCase()} />
                                
                                <ListItemSecondaryAction>
                                    <IconButton disabled={c.email === getUser().email || !this.isOwner()} onClick={() => this.setState({
                                        removeDialog: true,
                                        collabToDelete: c
                                    })}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                }
                <Divider/>
                <h2>API</h2>
                <Typography variant="body1">
                    {strings.YOUR_API_ENDPOINT}
                </Typography>
                <Typography variant="body1">
                    <code>
                        https://api.backpulse.io/{this.props.match.params.name}
                    </code>
                </Typography>
                <div className="docs-btn">
                    <Button href="https://docs.backpulse.io" target="_blank"  variant="contained" color="primary">{strings.CHECKOUT_DOCS}</Button>
                    <Button href="https://github.com/backpulse/wrapper" style={{marginLeft: 15}} target="_blank" variant="contained" color="primary">JS Wrapper</Button>
                </div>

            </div>
        )
    }
}

export default withRouter(Access);