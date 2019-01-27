import React from 'react';

import AppBar from 'components/AppBar';

import strings from 'strings';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {getUser, signOut} from 'utils/token';

import './styles.scss';

import client from 'services/client';

class MyAccount extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",

            currentPassword: "",
            newPassword: "",
            confirmPassword: "",

            error: false,
            errorMsg: "",
            errorField: "",

            confirmDelete: false,
            confirmEmail: ""
        }
    }

    componentWillMount() {
        client.get('/user').then(response => {
            console.log(response.data);
            const user = response.data.payload;
            this.setState({
                ...user,
                lastEmail: user.email
            });
        }).catch(err => {
            if(err) throw err;
        });
    }

    updateProfile = () => {
        client.put('/profile', {
            fullname: this.state.fullname,
            email: this.state.email
        }).then(response => {
            if(this.state.lastEmail !== this.state.email) {
                this.openSnack(strings.VERIFY_EMAIL)
            };
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    updatePassword = () => {
        client.put('/user/password', {
            last_password: this.state.currentPassword,
            new_password: this.state.newPassword
        }).then(response => {
            console.log(response.data);
            this.setState({
                error: false,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
            this.openSnack(strings.PASSWORD_CHANGED);
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        });
    }

    handleDeleteAccount = () => {
        client.delete('/user').then(response => {
            console.log(response.data);
            signOut();
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        });
    }

    checkError = err => {
        const errType = err.data.message;
        switch(errType) {
            case "wrong_last_password": {
                this.setState({
                    errorMsg: strings.WRONG_PASSWORD,
                    error: true,
                    errorField: "current_pass"
                });
                break;
            }
            case "password_too_short": {
                this.setState({
                    errorMsg: strings.PASSWORD_TOO_SHORT,
                    error: true,
                    errorField: "new_pass"
                });
                break;
            }
            case "password_too_long": {
                this.setState({
                    errorMsg: strings.PASSWORD_TOO_LONG,
                    error: true,
                    errorField: "new_pass"
                });
                break;
            }
            case "delete_sites_first": {
                this.setState({
                    errorMsg: strings.DELETE_ALL_APPS_FIRST,
                    error: true,
                    errorField: "confirm"
                });
                break;
            }
            default:
                break
        }
    }

    openSnack = snackText => {
        this.setState({
            snackText,
            snack: true
        });
    }

    handleClose = () => {
        this.setState({ snack: false });
    };

    openConfirm = () => this.setState({
        confirmDelete: true
    });

    handleConfirmClose = () => {
        this.setState({
            confirmDelete: false
        });
    }

    render() {
        return (
            <div className="page my-account">
                <AppBar noMenu updateTheme={this.props.updateTheme}/>
                <h1>{strings.MENU_MY_ACCOUNT}</h1>
                
                <Snackbar
                    anchorOrigin={{vertical: "top", horizontal: "right"}}
                    open={this.state.snack}
                    onClose={this.handleClose}
                    autoHideDuration={2500}
                    message={<span>{this.state.snackText}</span>}
                />

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.handleConfirmClose}
                    >
                    <DialogTitle>{strings.CLOSE_ACCOUNT}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CLOSE_ACCOUNT_DESCRIPTION}
                        </DialogContentText>
                        <TextField
                            value={this.state.confirmEmail}
                            onChange={e => this.setState({
                                confirmEmail: e.target.value
                            })}
                            autoFocus
                            margin="dense"
                            label={strings.EMAIL}
                            type="email"
                            fullWidth
                        />
                        {this.state.error && this.state.errorField === "confirm" && <FormHelperText error={true}>
                            {this.state.errorMsg}
                        </FormHelperText>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleConfirmClose} color="primary">
                            {strings.CANCEL}
                        </Button>
                        <Button disabled={this.state.confirmEmail !== getUser().email} className="button-danger" onClick={this.handleDeleteAccount}>
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid container direction="column">
                    <Grid className="group" item xs={12} md={12}>
                        <h2>{strings.PROFILE}</h2>
                        <TextField
                            error={this.state.errorField === "email"}
                            label={strings.EMAIL}
                            value={this.state.email}
                            onChange={e=>this.setState({email: e.target.value, error: false, errorField: ""})}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label={strings.NAME}
                            value={this.state.fullname}
                            onChange={e=>this.setState({fullname: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Button onClick={this.updateProfile} variant="contained" color="primary">{strings.SAVE}</Button>
                    </Grid>
                    <Grid className="group" item xs={12} md={12}>
                        <h2>{strings.AUTHENTICATION_PASSWORD}</h2>
                        <TextField
                            label={strings.CURRENT_PASSWORD}
                            error={this.state.errorField === "current_pass"}
                            value={this.state.currentPassword}
                            type="password"
                            onChange={e=>this.setState({currentPassword: e.target.value, error: false, errorField: ""})}
                            margin="normal"
                            fullWidth
                        />
                        <Divider className="divider"/>
                        <TextField
                            label={strings.NEW_PASSWORD}
                            error={this.state.errorField === "new_pass"}
                            value={this.state.newPassword}
                            type="password"
                            onChange={e=>this.setState({newPassword: e.target.value, error: false, errorField: ""})}
                            margin="normal"
                            fullWidth
                        />
                        <Typography>{strings.PASSWORD_RULES}</Typography>
                        <TextField
                            error={this.state.newPassword !== this.state.confirmPassword}
                            label={strings.CONFIRM}
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={e=>this.setState({confirmPassword: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        {this.state.error && this.state.errorField !== "confirm" && <FormHelperText error={true}>
                            {this.state.errorMsg}
                        </FormHelperText>}
                        <Button onClick={this.updatePassword} variant="contained" color="primary">{strings.CHANGE_PASSWORD}</Button>
                    </Grid>
                    <Grid className="group" item xs={12} md={12}>
                        <h2 className="red-text">{strings.DANGER_ZONE}</h2>
                        <Typography className="warning-text">{strings.DELETE_ALL_APPS_FIRST}</Typography>
                        <Button onClick={this.openConfirm} variant="contained" className="button-danger">{strings.CLOSE_ACCOUNT}</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MyAccount;