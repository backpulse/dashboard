import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import strings from 'strings';

class Projects extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page dashboard-projects">
                {/* <AppBar title={this.props.match.params.name}/> */}
                {/* <DrawerMenu/> */}
                <Fab onClick={this.handleNewSite} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Fab>
                <h1>Projects</h1>
            </div>
        );
    }
}

export default withRouter(Projects);