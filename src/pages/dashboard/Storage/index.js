import React from 'react';

import strings from 'strings';
import {withRouter} from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FileUploader from 'components/FileUploader';

import client from 'services/client';

class Storage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            importFiles: false
        }
    }

    componentDidMount() {
        this.fetchFiles();
    }
    
    fetchFiles = () => {
        this.setState({fetched: true});
        client.get('/files/' + this.props.match.params.name).then(response => {
            const files = response.data.payload || [];
            this.setState({files});
            console.log(files);
        }).catch(err => {
            if(err) throw err;
        });
    }

    importFiles = () => this.setState({
        importFiles: true
    })

    closeImport = () => this.setState({
        importFiles: false
    });

    onUploadDone = data => {
        console.log(data);
        this.fetchFiles();
    }

    render() {
        return (
            <div className="page dashboard-storage">
                <h1>{strings.DRAWER_STORAGE}</h1>
                <Fab onClick={this.importFiles} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.IMPORT_FILE}
                </Fab>

                {!this.state.fetched && <CircularProgress style={{display: "block"}}/>}

                <FileUploader
                    siteName={this.props.match.params.name} 
                    isStorage
                    allTypes
                    onDone={this.onUploadDone} 
                    open={this.state.importFiles} 
                    close={this.closeImport}
                />
            </div>
        );
    }
}

export default withRouter(Storage);