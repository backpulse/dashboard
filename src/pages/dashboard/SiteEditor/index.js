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
            site: {}
        }
    }

    fetchSite = () => {
        client.get('/sites/' + this.props.match.params.name).then(response => {
            const site = response.data.payload || {};
            this.setState({site});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchSite();
    }

    render() {
        return (
            <div className="site-editor">
                <AppBar title={this.props.match.params.name}/>
                <DrawerMenu site={this.state.site}/>
            </div>
        );
    }
}

export default withRouter(SiteEditor);