import React from 'react';

import {withRouter} from 'react-router';

import client from 'services/client';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Selector from 'components/Selector';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import strings from 'strings';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';

import './styles.scss';

class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            descriptions: [
                {
                    language_name: "English",
                    language_code: "en",
                    content: ""
                }
            ],
            languages: [],
            fetched: false
        }
    }

    componentDidMount() {
        this.fetchAbout();
        this.fetchLanguages();
    }

    fetchLanguages = () => {
        client.get('/constants/languages').then(response => {
            const languages = response.data.payload;
            languages.sort(function(a, b){
                if(a.Name < b.Name) { return -1; }
                if(a.Name > b.Name) { return 1; }
                return 0;
            })
            this.setState({languages});
        }).catch(err => {
            if(err) throw err;
        });
    }

    saveAbout = () => {
        client.put('/about/' + this.props.match.params.name, {
            name: this.state.name,
            descriptions: this.state.descriptions
        }).then(response => {
            console.log(response.data);
            this.props.enqueueSnackbar(strings.SAVED, {variant: "success"})
        }).catch(err => {
            this.checkError(err);
            if(err) throw err;
        })
    }

    fetchAbout = () => {
        client.get('/about/' + this.props.match.params.name).then(response => {
            const about = response.data.payload;
            this.setState({...about, fetched: true});
        }).catch(err => {
            this.setState({fetched: true});
            if(err) throw err;
        });
    }
    handleChangeDescription = (e, i) => {
        const value = e.target.value;
        const descriptions = this.state.descriptions;
        descriptions[i].content = value;
        this.setState({
            descriptions
        });
    }

    handleDescriptionRemove = i => {
        const descriptions = this.state.descriptions;
        descriptions.splice(i, 1);
        this.setState({descriptions});
    }

    onDescriptionLanguageAdd = e => {
        if(!e) return
        const language = e.value;
        const descriptions = this.state.descriptions;
        descriptions.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({descriptions});
    }

    getAvailableDescriptionLanguages = () => {
        const languages = this.state.languages;
        const available = [];
        languages.forEach((lang) => {
            let exists = false;
            for(let i = 0; i < this.state.descriptions.length; i++) {
                const desc = this.state.descriptions[i];
                if(desc.language_code === lang.Code) {
                    exists = true;
                    break;
                }
            }
            if(!exists) {
                available.push({
                    label: lang.Name,
                    value: lang
                });
            }
        });
        return available;
    }

    render() {
        return (
            <div className="page dashboard-about">
                <h1>{strings.ABOUT}</h1>
                {!this.state.fetched && <CircularProgress className="progress"/>}
                {this.state.fetched && <Grid container direction="column">
                    <Grid item xs={12} md={12}>
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
                    <Grid item xs={12} md={12}>
                        <div className="title-div">
                            <h2>{strings.DESCRIPTIONS}</h2>
                            <FormControl fullWidth>
                                <Selector
                                    options={this.getAvailableDescriptionLanguages()}
                                    value={""}
                                    placeholder={strings.ADD_TRANSLATION}
                                    onChange={this.onDescriptionLanguageAdd}
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    
                    {this.state.descriptions.map((desc, i) => (
                        <Grid key={i} item xs={12} md={12}>
                            <TextField
                                label={desc.language_name}
                                variant="outlined"
                                className="description-input"
                                multiline
                                value={desc.content}
                                onChange={e => this.handleChangeDescription(e, i)}
                                margin="dense"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment className="remove-button" position="end">
                                        {this.state.descriptions.length > 1 && <RemoveCircle
                                            onClick={() => this.handleDescriptionRemove(i)}
                                        >
                                        </RemoveCircle>}
                                    </InputAdornment>
                                )
                                }}
                            />
                        </Grid>
                    ))}
                    {this.state.error && <FormHelperText error={true}>
                        {this.state.errorMsg}
                    </FormHelperText>}
                    <Grid item xs={12} md={12}>
                        <Button onClick={this.saveAbout} className="save-button" variant="contained" color="primary" fullWidth>{strings.SAVE}</Button>
                    </Grid>
                </Grid>}
            </div>
        );
    }
}

export default withRouter(withSnackbar(About));