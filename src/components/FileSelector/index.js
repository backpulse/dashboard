import React from 'react';

import client from 'services/client';

class FileSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    fetchfiles = () => {
        this.setState({fetched: false});
        client.get('/files/' + this.props.match.params.name).then(response => {
            const files = response.data.payload;
            this.setState({files, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentWillMount() {
        this.fetchfiles();
    }

    render() {
        return (
            <div className="file-selector">
            </div>
        )
    }
}

export default FileSelector;