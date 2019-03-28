import React from 'react';

import strings from 'strings';
import {withRouter} from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FileUploader from 'components/FileUploader';
import File from 'components/File';

import client from 'services/client';
import './styles.scss';
import Masonry from 'react-masonry-component';

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
        this.setState({fetched: false});
        client.get('/files/' + this.props.match.params.name).then(response => {
            const files = response.data.payload || [];
            files.reverse();
            this.setState({files, fetched: true});
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
        this.closeImport();
    }

    render() {
        return (
            <div className="page dashboard-storage">
                <h1 className="title-div">{strings.DRAWER_STORAGE}</h1>
                {!this.state.fetched && <CircularProgress style={{display: "block"}}/>}
                <Fab onClick={this.importFiles} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.IMPORT_FILE}
                </Fab>


                {/* <div className="files-container"> */}
                    <Masonry className="files-container">
                        {this.state.files.map((file, i) => (
                            // <div>
                                <File data={file} key={i}/>
                            // </div>
                        ))}
                    </Masonry>
                {/* </div> */}

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