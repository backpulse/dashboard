import React from 'react';

import './styles.scss';
import strings from 'strings';

import {withRouter} from 'react-router';
import AddIcon from '@material-ui/icons/Add';

import client from 'services/client';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Grid from '@material-ui/core/Grid';
import ExtensionIcon from '@material-ui/icons/Extension';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class Modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            fetched: false,
            
            open: false,
            confirm: false,

            moduleToAdd: ""
        }

        this.modules = ["projects", "galleries", "articles", "videos"];
    }

    fetchModules = () => {
        client.get('/sites/' + this.props.match.params.name + '/modules').then(response => {
            const modules = response.data.payload;
            this.setState({modules, fetched: true});
            console.log(modules);
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchModules();
    }

    getModuleName = m => {
        if(m === "galleries") return strings.MODULE_GALLERIES;
        if(m === "projects") return strings.MODULE_PROJECTS;
        if(m === "articles") return strings.MODULE_ARTICLES;
        if(m === "videos") return strings.MODULE_VIDEOS;
    }

    openModuleSelector = () => this.setState({
        open: true
    });

    closeModuleSelector = () => this.setState({
        open: false
    });

    getModules = () => {
        const modules = this.modules;
        
        const availableModules = [];

        for(let i = 0; i < modules.length; i++) {
            let exists = false;
            for(let j = 0; j < this.state.modules.length; j++) {
                if(modules[i] === this.state.modules[j]) {
                    exists = true;
                }
            }
            if (!exists) {
                availableModules.push(modules[i]);
            }
        }
        return availableModules;
    }

    onSelect = e => {
        const m = e.target.value;
        this.setState({
            moduleToAdd: m
        });
    }

    addModule = e => {
        e.preventDefault();
        client.post('/sites/' + this.props.match.params.name + '/modules/' + this.state.moduleToAdd).then(response => {
            window.location.reload();
        }).catch(err => {
            if(err) throw err;
        });
    }

    confirmRemove = m => this.setState({
        confirm: true,
        moduleToDelete: m 
    });

    closeConfirm = () => this.setState({
        confirm: false
    });

    removeModule = () => {
        client.delete('/sites/' + this.props.match.params.name + '/modules/' + this.state.moduleToDelete).then(response => {
            window.location.reload();
        }).catch(err => {
            if(err) throw err
        });
    }

    render() {
        return (
            <div className="page dashboard-modules">
                <h1>{strings.DRAWER_MODULES}</h1>
                <Button disabled={this.modules.length === this.state.modules.length || !this.state.fetched} onClick={this.openModuleSelector} className="add-module-btn" variant="contained" color="primary">
                    <AddIcon />
                    {strings.ADD_MODULE}
                </Button>
                {!this.state.fetched && <CircularProgress style={{display: "block"}}/>}
                <Grid item lg={4} md={8} xs={12}>
                    {this.state.fetched && 
                        <List className="module-list">
                            {this.state.modules.map((m, i) => (
                                <ListItem style={{paddingLeft: 5}} key={i} dense>
                                    <ListItemIcon>
                                        <ExtensionIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={this.getModuleName(m)} />
                                    
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => this.confirmRemove(m)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    }
                </Grid>

                <Dialog
                    open={this.state.confirm}
                    onClose={this.closeConfirm}
                    >
                    <DialogTitle>{strings.REMOVE_MODULE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.REMOVE_MODULE_DESCRIPTION}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirm} autoFocus color="primary">
                            {strings.CANCEL}
                        </Button>
                        <Button className="button-danger" onClick={this.removeModule}>
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.closeModuleSelector}
                    fullWidth>
                    <form onSubmit={this.addModule}>
                        <DialogTitle>{strings.ADD_MODULE}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.ADD_MODULE_DESCRIPTION}
                            </DialogContentText>
                            <FormControl fullWidth>
                                <Select onChange={this.onSelect} value={this.state.moduleToAdd}>
                                    {this.getModules().map((m, i) => (
                                        <MenuItem key={i} value={m}>
                                            {this.getModuleName(m)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeModuleSelector} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.ADD}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }

}
export default withRouter(Modules);