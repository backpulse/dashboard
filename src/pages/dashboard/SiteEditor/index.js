import React from 'react';

import {withRouter} from 'react-router';

import './styles.scss';

import client from 'services/client';
import DrawerMenu from 'components/DrawerMenu';
import AppBar from 'components/AppBar';


class SiteEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    fetchSite = () => {
        client.get('/sites/' + this.props.match.params.name).then(response => {
            const site = response.data.payload;
            this.setState({...site});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchSite();
    }

    render() {
        return (
            <div className="page dashboard-site-editor">
                <AppBar title={this.props.match.params.name}/>
                <DrawerMenu/>
                <h1>{this.state.name}</h1>
            </div>
        );
    }
}

export default withRouter(SiteEditor);