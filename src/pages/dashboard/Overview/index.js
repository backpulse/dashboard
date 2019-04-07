import React from 'react';

import strings from 'strings';

import client from 'services/client';

import {withRouter}from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';

class Overview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fetched: false,
            display_name: "",
            name: "",
            total_size: 0,
            files: 0,
            galleries: 0,
            articles: 0,
            projects: 0,
            videogroups: 0,
            albums: 0,
            collaborators: [],

        }
    }

    fetchOverview = () => {
        this.setState({fetched: false});
        client.get('/sites/' + this.props.match.params.name + '/overview').then(response => {
            const overview = response.data.payload;
            this.setState({...overview, fetched: true});
        }).then(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchOverview();
    }

    render() {
        return (
            <div className="page dashboard-overview">
                <h1>{this.state.display_name}</h1>
                {!this.state.fetched && <CircularProgress/>}
            </div>
        );
    }
}

export default withRouter(Overview);