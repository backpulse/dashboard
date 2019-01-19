import React from 'react';

import {withRouter} from 'react-router';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import strings from 'strings';

import client from 'services/client';

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
            email: "",
            facebook_url: "",
            instagram_url: "",
            twitter_url: "",

            error: false,
            errorField: "",
            errorMsg: ""
        }
    }

    fetchContact = () => {
        client.get('/contact/' + this.props.match.params.name).then(response => {
            const contact = response.data.payload;
            this.setState({...contact});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchContact();
    }

    saveContact = () => {
        client.put('/contact/' + this.props.match.params.name, {
            ...this.state
        }).then(response => {
            this.setState({error: false, errorField: "", errorMsg: ""});
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        });
    }

    checkError = err => {
        const errType = err.data.message;
        switch(errType) {
            case "name_too_long": {
                this.setState({
                    errorField: "name",
                    errorMsg: strings.NAME_TOO_LONG,
                    error: true
                });
                break;
            }
            case "phone_too_long": {
                this.setState({
                    errorField: "phone",
                    errorMsg: strings.PHONE_TOO_LONG,
                    error: true
                });
                break;
            }
            case "email_too_long": {
                this.setState({
                    errorField: "email",
                    errorMsg: strings.EMAIL_TOO_LONG,
                    error: true
                });
                break;
            }
            case "address_too_long": {
                this.setState({
                    errorField: "address",
                    errorMsg: strings.ADDRESS_TOO_LONG,
                    error: true
                });
                break;
            }
            case "facebook_url_too_long": {
                this.setState({
                    errorField: "facebook",
                    errorMsg: strings.FACEBOOK_TOO_LONG,
                    error: true
                });
                break;
            }
            case "instagram_url_too_long": {
                this.setState({
                    errorField: "instagram",
                    errorMsg: strings.INSTAGRAM_TOO_LONG,
                    error: true
                });
                break;
            }
            case "twitter_url_too_long": {
                this.setState({
                    errorField: "twitter",
                    errorMsg: strings.TWITTER_TOO_LONG,
                    error: true
                });
                break;
            }
            default:
                break
        }
    }

    render() {
        return (
            <div className="page dashboard-contact">
                <h1>{strings.CONTACT}</h1>
                <Grid container direction="column">
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "name"}
                            label={strings.CONTACT_NAME}
                            variant="outlined"
                            value={this.state.name}
                            onChange={e=>this.setState({name: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "address"}
                            label={strings.CONTACT_ADDRESS}
                            variant="outlined"
                            multiline
                            value={this.state.address}
                            onChange={e=>this.setState({address: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                        error={this.state.errorField === "phone"}
                            label={strings.CONTACT_PHONE}
                            variant="outlined"
                            value={this.state.phone}
                            onChange={e=>this.setState({phone: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "email"}
                            label={strings.CONTACT_EMAIL}
                            variant="outlined"
                            type="email"
                            value={this.state.email}
                            onChange={e=>this.setState({email: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "facebook"}
                            label={strings.CONTACT_FACEBOOK_URL}
                            variant="outlined"
                            value={this.state.facebook_url}
                            onChange={e=>this.setState({facebook_url: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "instagram"}
                            label={strings.CONTACT_INSTAGRAM_URL}
                            variant="outlined"
                            value={this.state.instagram_url}
                            onChange={e=>this.setState({instagram_url: e.target.value})}
                            margin="normal"
                            fullWidth
                            
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            error={this.state.errorField === "twitter"}
                            label={strings.CONTACT_TWITTER_URL}
                            variant="outlined"
                            value={this.state.twitter_url}
                            onChange={e=>this.setState({twitter_url: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    {this.state.error && <FormHelperText error={true}>
                        {this.state.errorMsg}
                    </FormHelperText>}
                    <Grid item xs={12} md={4}>
                        <Button onClick={this.saveContact} style={{marginTop: 15}} variant="contained" color="primary" fullWidth>{strings.SAVE}</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(Contact);