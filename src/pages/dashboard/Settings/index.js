import React from 'react';
import DrawerMenu from 'components/DrawerMenu';
import AppBar from 'components/AppBar';

import {withRouter}from 'react-router';

class Settings extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
            <div className="page dashboard-settings">
                <AppBar title={this.props.match.params.name}/>
                <DrawerMenu/>
                Settings
            </div>
        );
    }
}

export default withRouter(Settings);