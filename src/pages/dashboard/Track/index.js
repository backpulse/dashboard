import React from 'react';

import {withRouter} from 'react-router';

import client from 'services/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import strings from 'strings';
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import FileSelector from 'components/FileSelector';
import InputAdornment from '@material-ui/core/InputAdornment';
import StorageIcon from '@material-ui/icons/Storage';
import IconButton from '@material-ui/core/IconButton';
import './styles.scss';

class Track extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            url: "",
            title: "",
            image: "",
            description: "",

            fileSelector: false,
            audioSelector: false
        }
    }

    fetchTrack = () => {
        client.get('/tracks/' + this.props.match.params.name + '/' + this.props.match.params.id).then(response => {
            const track = response.data.payload;
            this.setState({...track, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchTrack();
    }

    saveTrack = e => {
        e.preventDefault();
        client.put('/tracks/' + this.props.match.params.name + '/' + this.props.match.params.id, {
            title: this.state.title,
            content: this.state.content,
            url: this.state.url,
            image: this.state.image,
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    onImageSelected = file => {
        this.setState({image: file.url});
        this.closeFileSelector();
    }

    onAudioSelected = file => {
        this.setState({url: file.url});
        this.closeAudioSelector();
    }

    closeFileSelector = () => this.setState({
        fileSelector: false
    });

    openFileSelector = () => this.setState({
        fileSelector: true
    });

    closeAudioSelector = () => this.setState({
        audioSelector: false
    });

    openAudioSelector = () => this.setState({
        audioSelector: true
    });

    render() {
        return (
            <div className="page dashboard-track">
                <h1>{strings.EDIT_TRACK}</h1>
                {!this.state.fetched && <CircularProgress/>}

                <FileSelector 
                    close={this.closeFileSelector} 
                    open={this.state.fileSelector}
                    onFileSelected={this.onImageSelected}
                    accept={"image"}
                />
                <FileSelector 
                    close={this.closeAudioSelector} 
                    open={this.state.audioSelector}
                    onFileSelected={this.onAudioSelected}
                    accept={"audio"}
                />

                <form onSubmit={this.saveTrack}>
                {this.state.fetched && <Grid direction="column" container>
                    <Grid>
                        <TextField
                            label={strings.TITLE}
                            value={this.state.title}
                            variant={"outlined"}
                            multiline
                            onChange={e => this.setState({
                                title: e.target.value
                            })}
                            margin="normal"
                            fullWidth
                            required
                        />
                        <TextField
                            label={strings.CONTENT}
                            value={this.state.content}
                            variant={"outlined"}
                            multiline
                            rows={10}
                            onChange={e => this.setState({
                                content: e.target.value
                            })}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                                label={strings.AUDIO_FILE}
                                value={this.state.url}
                                onChange={e=>this.setState({url: e.target.value})}
                                margin="normal"
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={this.openAudioSelector}>
                                            <StorageIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                            <TextField
                                label={strings.IMAGE}
                                value={this.state.image}
                                onChange={e=>this.setState({image: e.target.value})}
                                margin="normal"
                                fullWidth
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={this.openFileSelector}>
                                            <StorageIcon/>
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                            />
                        {this.state.image.length > 2 && <img alt="cover" src={this.state.image}/>}
                    </Grid>
                    <Grid>
                        <Button
                            style={{marginTop: 10}}
                            color="primary"
                            type="submit"
                            variant="contained">
                        {strings.SAVE_TRACK}</Button>
                    </Grid>

                </Grid>}
                </form>
            </div>
        );
    }
}

export default withRouter(Track);