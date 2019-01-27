import React from 'react';

import './styles.scss';

import client from 'services/client';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import CircularProgress from '@material-ui/core/CircularProgress';

import {toTitleCase} from 'utils';

import strings from 'strings';
import SiteBox from 'components/SiteBox';

import AppBar from 'components/AppBar';

class MySites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newSiteDialog: false,
            siteName: "",
            siteType: "",
            sites: [],

            nameHasError: false,
            error: false,
            errorMsg: "",
            fetched: false
        }
    }

    fetchSites = () => {
        client.get('/sites').then(response => {
            const sites = response.data.payload || [];
            this.setState({sites, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchSites();
    }


    handleNewSite = () => {
        this.setState({newSiteDialog: true, errorMsg: "", error: false, nameHasError: false, siteName: "", siteType: ""})
    };
    handleNewSiteDialogClose = () => this.setState({newSiteDialog: false});

    handleTypeChange = e => {
        this.setState({siteType: e.target.value});
    }

    handleNameChange = e => {
        this.setState({
            siteName: e.target.value,
            error: false,
            errorMsg: "",
            nameHasError: false
        });
    }

    onKeyDown = e => {
        if(e.keyCode === 32) e.preventDefault();
    }

    createSite = e => {
        e.preventDefault();
        client.post('/sites', {
            name: this.state.siteName,
            type: this.state.siteType
        }).then(response => {
            this.fetchSites();
            this.handleNewSiteDialogClose();
        }).catch(err => {
            this.checkError(err);
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
            case "site_exists": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.SITE_EXISTS,
                    error: true
                });
                break;
            }
            case "incorrect_characters": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.SITE_NAME_INCORRECT,
                    error: true
                });
                break;
            }
            default:
                break
        }
    }

    favoriteSite = site => {
        const sites = this.state.sites;
        sites.forEach((s, i) => {
            if(s.name === site.name) {
                sites[i].favorite = !sites[i].favorite;
            }
        });
        this.setState({sites});
        client.put('/sites/favorite/' + site.name).then(response => {
            this.fetchSites();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-my-sites">
                <AppBar noMenu updateTheme={this.props.updateTheme}/>
                <Fab onClick={this.handleNewSite} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.MY_SITES_ADD_SITE}
                </Fab>

                <h1>{strings.MENU_MY_SITES}</h1>
                {!this.state.fetched && <CircularProgress/>}

                {this.state.sites.length < 1 && this.state.fetched && <Button className="new-site-button" onClick={this.handleNewSite} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.MY_SITES_ADD_SITE}
                </Button>}
                <div className="sites-container">
                    {this.state.sites.map((site, i) => (
                        <SiteBox 
                            open={() => this.openSite(site)} 
                            favorite={() => this.favoriteSite(site)}
                            key={i} 
                            site={site}/>
                    ))}
                </div>

                <Dialog
                    open={this.state.newSiteDialog}
                    onClose={this.handleNewSiteDialogClose}
                    fullWidth
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.createSite}>
                        <DialogTitle id="form-dialog-title">{strings.NEW_SITE_TITLE}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {strings.NEW_SITE_DESCRIPTION}
                            </DialogContentText>
                            <FormControl fullWidth>
                                <TextField
                                    error={this.state.nameHasError}
                                    required
                                    onChange={this.handleNameChange}
                                    autoFocus
                                    onKeyDown={this.onKeyDown}
                                    margin="dense"
                                    label={strings.NEW_SITE_NAME}
                                    fullWidth
                                />
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleNewSiteDialogClose} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.CREATE}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default MySites;