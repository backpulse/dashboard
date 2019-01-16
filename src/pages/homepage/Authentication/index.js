import React from 'react';

import './styles.scss';

import strings from 'strings';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import client from 'services/client';
import { saveJWT } from '../../../utils/token';

class Authentication extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onSubmit = e => {
        e.preventDefault();
        if(this.props.type === "login") {
            /* Authentication */
            client.post('/users/authenticate', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                console.log(response.data);
            }).catch(err => {
                //TODO: display error
                if(err) throw err;
            });
        } else {
            /* Sign up */
            client.post('/users', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                saveJWT(response.data.payload);
                window.location = "/";
            }).catch(err => {
                //TODO: display error
                if(err) throw err;
            });
        }
    }

    render() {
        return (
            <div className="page homepage-authentication">
                <div>
                    <h1>{this.props.type === "login" ? strings.AUTHENTICATION_LOGIN_TO_BACKPULSE : strings.AUTHENICATION_CREATE_BACKPULSE_ACCOUNT}</h1>

                    <Paper className="form">
                        <form onSubmit={this.onSubmit}>
                            <FormControl fullWidth>
                                <TextField
                                    variant="filled"
                                    autoFocus
                                    type="email"
                                    label={strings.AUTHENTICATION_EMAIL_ADDRESS}
                                    margin="normal"
                                    required
                                    onChange={e => this.setState({
                                        email: e.target.value
                                    })}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    variant="filled"
                                    label={strings.AUTHENTICATION_PASSWORD}
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={e => this.setState({
                                        password: e.target.value
                                    })}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Button type="submit" variant="contained" color="secondary">
                                    {this.props.type === "login" ? strings.AUTHENTICATION_LOGIN : strings.AUTHENTICATION_SIGN_UP}
                                </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Authentication;