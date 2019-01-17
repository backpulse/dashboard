import React from 'react';

import Paper from '@material-ui/core/Paper';

import './styles.scss';

class SiteBox extends React.Component {
    render() {
        return (
            <Paper className="sitebox">
                {this.props.site.name}
            </Paper>
        );
    }
}

export default SiteBox;