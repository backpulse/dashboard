import React from 'react';

import {withRouter}from 'react-router';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';

import './styles.scss';

import Selector from 'components/Selector';

import strings from 'strings';

import client from 'services/client';
import Typography from '@material-ui/core/Typography';

class Settings extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            errorField: "",
            error: false,
            name: "",
            display_name: "",
            editingName: false,
            collaborators: []
        }
    }

    fetchSite = () => {
        client.get('/sites/' + this.props.match.params.name).then(response => {
            const site = response.data.payload;
            site.collaborators = site.collaborators || []
            this.setState({...site});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentWillMount() {
        this.fetchSite();
    }

    toggleEditName = () => this.setState({
        editingName: !this.state.editingName
    });

    getCollaborators = () => {
        const collaborators = this.state.collaborators.map(c => ({
            label: c.name,
            value: c.id
        }));
        return collaborators;
    }

    saveSettings = () => {
        client.put('/sites/' + this.props.match.params.name).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-settings">
            <h1>{strings.SETTINGS}</h1>
            <Grid container direction="column">
                <Typography variant="h5">{strings.SITE}</Typography>
                <Grid item xs={12} md={4}>
                    <TextField
                        error={this.state.errorField === "name"}
                        label={strings.NAME}
                        disabled={!this.state.editingName}
                        value={this.state.name}
                        onChange={e=>this.setState({name: e.target.value})}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={this.toggleEditName}>
                                    <EditIcon/>
                                </IconButton>
                            </InputAdornment>,
                        }}
                    />
                    <TextField
                        error={this.state.errorField === "displayName"}
                        label={strings.DISPLAY_NAME}
                        value={this.state.display_name}
                        onChange={e=>this.setState({display_name: e.target.value})}
                        margin="normal"
                        fullWidth
                    />
                </Grid>
                <Divider variant="fullWidth"/>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5">{strings.OWNERSHIP}</Typography>
                    <Selector
                        options={this.getCollaborators()}
                        value={this.state.owner}
                        placeholder={strings.OWNER}
                        onChange={this.onTitleLanguageAdd}
                    />
                </Grid>
                <Divider variant="fullWidth"/>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5">{strings.OWNERSHIP}</Typography>
                    <Selector
                        options={this.getCollaborators()}
                        value={this.state.owner}
                        placeholder={strings.OWNER}
                        onChange={this.onTitleLanguageAdd}
                    />
                </Grid>
                
                {this.state.error && <FormHelperText error={true}>
                    {this.state.errorMsg}
                </FormHelperText>}
                <Grid item xs={12} md={4}>
                    <Button onClick={this.saveSettings} style={{marginTop: 15}} variant="contained" color="primary" fullWidth>{strings.SAVE}</Button>
                </Grid>
            </Grid>
        </div>
        );
    }
}

export default withRouter(Settings);