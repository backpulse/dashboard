import React from 'react';

import strings from 'strings';

import client from 'services/client';
import {withRouter} from 'react-router';

class Albums extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: []
        }
    }

    fetchAlbums = () => {
        client.get('/albums/' + this.props.match.params.name).then(response => {
            const albums = response.data.payload;
            this.setState({albums});
            console.log(albums);
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchAlbums();
    }

    render() {
        return (
            <div className="page dashboard-albums">
                <h1>{strings.MODULE_MUSIC}</h1>
            </div>
        );
    }
}

export default withRouter(Albums);