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

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

class Storage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            importFiles: false,
            confirmDelete: false,
            editFile: false,
            newFilename: ""
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

    closeConfirm = () => this.setState({
        confirmDelete: false
    })

    removeFile = () => {
        client.delete('/files/' + this.props.match.params.name + '/' + [this.state.fileToDelete.id]).then(response => {
            console.log(response.data);
            this.closeConfirm();
            this.fetchFiles();
        }).catch(err => {
            if(err) throw err;
        });
    }

    closeEdit = () => this.setState({
        editFile: false
    });

    editFile = e => {
        e.preventDefault();
        client.put('/files/' + this.props.match.params.name + '/' + this.state.fileToEdit.id + '/' + this.state.newFilename).then(response => {
            this.fetchFiles();
            this.closeEdit();
        }).catch(err => {
            if(err) throw err;
        });
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

                <Masonry className="files-container">
                    {this.state.files.map((file, i) => (
                        <File 
                            onDelete={() => this.setState({
                                fileToDelete: file,
                                confirmDelete: true
                            })}
                            onEdit={() => this.setState({
                                fileToEdit: file,
                                editFile: true,
                                newFilename: file.name
                            })}
                            data={file} 
                            key={i}
                        />
                    ))}
                </Masonry>

                <FileUploader
                    siteName={this.props.match.params.name} 
                    isStorage
                    allTypes
                    onDone={this.onUploadDone} 
                    open={this.state.importFiles} 
                    close={this.closeImport}
                />

                <Dialog
                    open={this.state.editFile}
                    onClose={this.closeEdit}
                    fullWidth>
                    <form onSubmit={this.editFile}>
                        <DialogTitle>{strings.EDIT_FILENAME}</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth>
                                <TextField
                                    required
                                    onChange={ e => this.setState({
                                        newFilename: e.target.value
                                    })}
                                    autoFocus
                                    value={this.state.newFilename}
                                    margin="dense"
                                    label={strings.FILE_NAME}
                                    fullWidth
                                />
                            </FormControl>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeEdit} color="primary">
                                {strings.CANCEL}
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                {strings.EDIT_FILENAME}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeConfirm}
                    fullWidth
                    >
                    <DialogTitle>{strings.REMOVE_FILE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.REMOVE_FILE_DESC}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirm} autoFocus color="primary">
                            {strings.CANCEL}
                        </Button>
                        <Button className="button-danger" onClick={this.removeFile}>
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Storage);