import React from 'react';

import AppBar from 'components/AppBar';

import strings from 'strings';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

import client from 'services/client';

class MyAccount extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        client.get('/account').then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page my-account">
                <AppBar updateTheme={this.props.updateTheme}/>
                <h1>{strings.MENU_MY_ACCOUNT}</h1>
                <Grid container direction="column">
                    <Grid className="group" item xs={12} md={12}>
                        <h2>{strings.PROFILE}</h2>
                        <TextField
                            error={this.state.errorField === "name"}
                            label={strings.NAME}
                            value={this.state.name}
                            onChange={e=>this.setState({name: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            error={this.state.errorField === "email"}
                            label={strings.EMAIL}
                            value={this.state.display_name}
                            onChange={e=>this.setState({display_name: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Button variant="contained" color="primary">{strings.SAVE}</Button>
                    </Grid>
                    <Grid className="group" item xs={12} md={12}>
                        <h2>{strings.AUTHENTICATION_PASSWORD}</h2>
                        <TextField
                            label={strings.CURRENT_PASSWORD}
                            value={this.state.currentPassword}
                            type="password"
                            onChange={e=>this.setState({currentPassword: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Divider className="divider"/>
                        <TextField
                            label={strings.NEW_PASSWORD}
                            value={this.state.newPassword}
                            onChange={e=>this.setState({newPassword: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Typography>{strings.PASSWORD_RULES}</Typography>
                        <TextField
                            label={strings.CONFIRM}
                            value={this.state.confirmPassword}
                            onChange={e=>this.setState({confirmPassword: e.target.value})}
                            margin="normal"
                            fullWidth
                        />
                        <Button variant="contained" color="primary">{strings.CHANGE_PASSWORD}</Button>
                    </Grid>
                    <Grid className="group" item xs={12} md={12}>
                        <h2 className="red-text">{strings.DANGER_ZONE}</h2>
                        <Typography className="warning-text">{strings.DELETE_ALL_APPS_FIRST}</Typography>
                        <Button variant="contained" className="button-danger">{strings.CLOSE_ACCOUNT}</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default MyAccount;