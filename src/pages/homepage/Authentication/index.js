import React from 'react';

import './styles.scss';

import strings from 'strings';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import client from 'services/client';
import { saveJWT } from '../../../utils/token';
import CircularProgress from '@material-ui/core/CircularProgress';

class Authentication extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

            errorMsg: "",
            error: false,
            emailHasError: false,
            passHasError: false,

            authenticating: false
        }
    }

    onSubmit = e => {
        e.preventDefault();

        this.setState({authenticating: true});
        client.post(this.props.type === "login" ? "/users/authenticate" : "/users", {
            email: this.state.email,
            password: this.state.password
        }).then(response => {
            saveJWT(response.data.payload);
            window.location = "/";
        }).catch(err => {
            this.checkError(err);
            this.setState({authenticating: false});
            if(err) throw err;
        });
    }

    checkError = err => {
        console.log(err);
        const errType = err.data.message;
        switch (errType) {
            case "password_too_short":
                this.setState({
                    errorMsg: strings.PASSWORD_TOO_SHORT,
                    passHasError: true,
                    emailHasError: false,
                    error: true
                });
                break;
            case "password_too_long":
                this.setState({
                    errorMsg: strings.PASSWORD_TOO_LONG,
                    passHasError: true,
                    emailHasError: false,
                    error: true
                });
                break;

            case "email_exists":
                this.setState({
                    errorMsg: strings.EMAIL_EXISTS,
                    emailHasError: true,
                    passHasError: false,
                    error: true
                });
                break;
            
            case "auth_fail":
                this.setState({
                    errorMsg: strings.AUTHENTICATION_FAIL,
                    emailHasError: true,
                    passHasError: true,
                    error: true
                });
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="homepage homepage-authentication">
                <div>
                    <h1>{this.props.type === "login" ? strings.AUTHENTICATION_LOGIN_TO_BACKPULSE : strings.AUTHENICATION_CREATE_BACKPULSE_ACCOUNT}</h1>
                    <Paper className="form">
                        <form onSubmit={this.onSubmit}>
                            <FormControl fullWidth>
                                <TextField
                                    variant="filled"
                                    error={this.state.emailHasError} 
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
                                    error={this.state.passHasError}
                                    label={strings.AUTHENTICATION_PASSWORD}
                                    type="password"
                                    margin="normal"
                                    required
                                    onChange={e => this.setState({
                                        password: e.target.value
                                    })}
                                />
                            </FormControl>
                            {this.state.error && <FormHelperText error={true}>
                                {this.state.errorMsg}
                            </FormHelperText>}
                            <FormControl fullWidth>
                                <Button disabled={this.state.authenticating} style={{color: "white"}} type="submit" variant="contained" color="secondary">
                                    {this.state.authenticating && <CircularProgress style={{marginRight: 15}} />}
                                    {this.props.type === "login" ? strings.AUTHENTICATION_LOGIN : strings.AUTHENTICATION_SIGN_UP}
                                </Button>
                            </FormControl>
                        </form>
                        {this.props.type === "login" && <a href="/signup">
                            {strings.NOT_REGISTERED_YET}
                        </a>}
                        {this.props.type !== "login" && <a href="/login">
                            {strings.ALREADY_REGISTERED}
                        </a>}
                    </Paper>
                </div>
            </div>
        );
    }
}

export default Authentication;