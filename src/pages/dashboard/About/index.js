import React from 'react';
import DrawerMenu from 'components/DrawerMenu';
import AppBar from 'components/AppBar';

import {withRouter} from 'react-router';

class About extends React.Component {
    render() {
        return (
            <div className="page dashboard-about">
                <AppBar title={this.props.match.params.name}/>
                <DrawerMenu/>
                about
            </div>
        );
    }
}

export default withRouter(About);