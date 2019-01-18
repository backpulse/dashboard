import React from 'react';

import {withRouter} from 'react-router';

class About extends React.Component {
    render() {
        return (
            <div className="page dashboard-about">
                <h1>About</h1>
            </div>
        );
    }
}

export default withRouter(About);