import React from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import strings from 'strings';

class Videos extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            fetched: false
        }
    }

    handleAddVideo = () => {

    }

    render() {
        return (
            <div className="page dashboard-videos">
                <h1>{strings.DRAWER_VIDEOS}</h1>

                <Fab onClick={this.handleAddVideo} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.ADD_VIDEO}
                </Fab>

            </div>
        );
    }
}

export default Videos;