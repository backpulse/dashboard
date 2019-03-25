import React from 'react';

import {withRouter} from 'react-router';

import client from 'services/client';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import strings from 'strings';
import CircularProgress from '@material-ui/core/CircularProgress';
import {youtubeParser} from 'utils';

import Grid from '@material-ui/core/Grid';

class Video extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            youtube_url: "",
            title: "",
            content: ""
        }
    }

    fetchVideo = () => {
        client.get('/videos/' + this.props.match.params.name + '/' + this.props.match.params.videoid).then(response => {
            console.log(response.data);
            const video = response.data.payload;
            this.setState({...video, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchVideo();
    }

    saveVideo = () => {
        client.put('/videos/' + this.props.match.params.name + '/' + this.props.match.params.videoid, {
            content: this.state.content,
            title: this.state.title,
            youtube_url: this.state.youtube_url
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-video">
                <h1>{strings.EDIT_VIDEO}</h1>
                {!this.state.fetched && <CircularProgress/>}
                {this.state.fetched && <Grid direction="column" container>
                    <Grid>
                        <TextField
                            label={strings.YOUTUBE_URL}
                            value={this.state.youtube_url}
                            variant={"outlined"}
                            multiline
                            onChange={e => this.setState({
                                youtube_url: e.target.value
                            })}
                            margin="normal"
                            fullWidth
                        />
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
                        <img alt="thumbnail" width={300} src={"https://img.youtube.com/vi/" + youtubeParser(this.state.youtube_url) + "/maxresdefault.jpg"}/>
                    </Grid>
                    <Grid>
                        <Button
                            style={{marginTop: 10}}
                            color="primary"
                            onClick={this.saveVideo}
                            variant="contained">
                        {strings.SAVE_VIDEO}</Button>
                    </Grid>

                </Grid>}
            </div>
        );
    }
}

export default withRouter(Video);