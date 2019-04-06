import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import client from 'services/client';

import strings from 'strings';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircle from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import {withRouter} from 'react-router';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import './styles.scss';
dayjs.extend(relativeTime);


class FileSelector extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            fetched: false,
            selected: {
                id: ""
            }
        }
    }

    fetchFiles = () => {
        this.setState({fetched: false});
        client.get('/files/' + this.props.match.params.name).then(response => {
            let files = response.data.payload || [];
            files = this.filterFiles(files);
            this.setState({files, fetched: true});
        })
    }

    filterFiles = files => {
        const filter = this.props.accept || "image";
        const filtered = []
        files.forEach(file => {
            if(file.type.startsWith(filter)) filtered.push(file);
        });
        return filtered;
    }


    componentWillMount() {
        this.fetchFiles();
    }

    selectImage = file => {
        if(file.id === this.state.selected.id) {
            this.setState({selected: {id: ""}});
            return
        }
        this.setState({selected: file});
    }

    goToStorage = () => {
        this.props.history.push('/site/' + this.props.match.params.name + '/storage');
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.state.publishing ? null : this.props.close}
                fullWidth
                className="file-selector"
                maxWidth={"md"}
            >
            <DialogTitle>{strings.SELECT_FILE}</DialogTitle>
            <DialogContent>
                {!this.state.fetched && <CircularProgress className="progress"/>}
                {this.state.files.length < 1 && 
                    <Button onClick={this.goToStorage} color="primary" variant="contained">
                        {strings.IMPORT_FILES}
                    </Button>
                }
                <GridList cellHeight={180}>
                    {this.state.files.length > 0 && 
                        this.state.files.map((file, i) => (
                            <GridListTile 
                                className={
                                    [
                                        (this.state.selected.id !== file.id && this.state.selected.id !== "") ? "disabled": "pointer", 
                                        file.type.startsWith("image") ? "file-is-image" : "file-is-any"
                                    ].join(" ")
                                } 
                                onClick={() => this.selectImage(file)} 
                                key={i}>

                                {file.type.startsWith("image") && <img src={file.url} alt={file.name} />}
                                <GridListTileBar
                                    title={file.name}
                                    subtitle={<span>{dayjs(file.created_at).fromNow()}</span>}
                                    actionIcon={
                                        <IconButton onClick={() => this.selectImage(file)}>
                                            {this.state.selected.id === file.id ? <Clear/> : <CheckCircle />}
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))
                    }
                </GridList>
            </DialogContent>
            <DialogActions>

                {this.state.files.length > 0 && <Button onClick={this.goToStorage} style={{left: 15, position: "absolute"}} color="primary">
                    {strings.IMPORT_FILES}
                </Button>}
                <Button onClick={this.props.close} color="primary">
                    {strings.CANCEL}
                </Button>
                <Button disabled={this.state.selected.id === ""} onClick={() => this.props.onFileSelected(this.state.selected)} variant="contained" color="primary">
                    {strings.SELECT}
                </Button>
            </DialogActions>
            </Dialog>
        )
    }   
}

export default withRouter(FileSelector);