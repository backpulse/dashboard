import React from 'react';

import {withRouter}from 'react-router';

class Settings extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page dashboard-settings">
                <h1>Settings</h1>
            </div>
        );
    }
}

export default withRouter(Settings);