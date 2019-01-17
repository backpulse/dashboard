import React from 'react';

import {withRouter} from 'react-router';

import DrawerMenu from 'components/DrawerMenu';
import AppBar from 'components/AppBar';

class Contact extends React.Component {
    render() {
        return (
            <div className="page dashboard-contact">
                <AppBar title={this.props.match.params.name}/>
                <DrawerMenu/>
                Contact
            </div>
        );
    }
}

export default withRouter(Contact);