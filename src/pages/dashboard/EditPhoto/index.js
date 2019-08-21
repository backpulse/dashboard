import React from 'react';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import strings from 'strings';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import client from 'services/client';

import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/CloudUpload';
import FileUploader from 'components/FileUploader';
import './styles.scss';
class EditPhoto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos : [],
            title: "",
            photo: "",
            fetched: false,
            loading: false,
            newPhotoDialog: false,
            confirmDelete: false,
            gallery_id: "none",
            galleries: [],

            importFiles: false

        }
    }

    componentDidMount() {
        this.fetchGalleries();
        this.fetchPhoto(this.props.match.params.id);
    }

    componentWillReceiveProps() {
        this.fetchGalleries();
        this.fetchPhoto(this.props.match.params.id);
    }

    openUploader = () => {
        this.setState({importFiles: true});
    }

    fetchGalleries = () => {
        client.get('/galleries/'+ this.props.match.params.name).then(response => {
            const galleries = response.data.payload || [];
            this.setState({
                galleries
            });
        }).catch(err => {
            if(err) throw err;
        });
    }

    fetchPhoto = id => {
        client.get('/photos/' + this.props.match.params.name + "/" + id).then(response => {
            const photo = response.data.payload;
            if(!photo.gallery_id) photo.gallery_id = "none";
            console.log(photo.gallery_id);
            this.setState({...photo, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }
    
    checkError = err => {
        const errType = err.data.message;
        switch(errType) {
            case "name_too_short": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.NAME_TOO_SHORT,
                    error: true
                });
                break;
            }
            case "name_too_long": {
                this.setState({
                    nameHasError: true,
                    errorMsg: strings.NAME_TOO_LONG,
                    error: true
                });
                break;
            }
            default:
                break
        }
    }

    handleNameChange = e => this.setState({
        title: e.target.value
    });

    handleContentchange = e => this.setState({
        content: e.target.value
    });

    closeConfirmDelete = () => this.setState({
        confirmDelete: false
    });

    onGallerychange = e => {
        this.setState({gallery_id: e.target.value});
    }

    onUploadDone = () => {
        this.fetchPhoto(this.props.match.params.id);
    }

    save = () => {
        client.put('/photos/' + this.props.match.params.name + '/' + this.props.match.params.id, {
            title: this.state.title,
            content: this.state.content,
            url: this.state.url,
            gallery_id: this.state.gallery_id !== "none" ? this.state.gallery_id : null
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        })
    }

    onUploadDone = () => {
        this.setState({importFiles: false});
        this.fetchPhoto(this.props.match.params.id);
    }

    render() {
        return (
            <div className="page dashboard-photo">
                <div className="title-div">
                    <h1>{strings.PHOTO}</h1>
                </div>
                {!this.state.fetched && <CircularProgress/>}

                {this.state.fetched && <React.Fragment>
                    <FormControl fullWidth>
                    <TextField
                        error={this.state.nameHasError}
                        required
                        onChange={this.handleNameChange}
                        autoFocus
                        value={this.state.title}
                        margin="dense"
                        label={strings.TITLE}
                        fullWidth
                    />
                    </FormControl>
                    <FormControl fullWidth>
                        <FormHelperText>{strings.GALLERY}</FormHelperText>
                        <Select label={strings.GALLERY} onChange={this.onGallerychange} value={this.state.gallery_id}>
                            <MenuItem value={"none"}>
                                {strings.NONE}
                            </MenuItem>
                            {this.state.galleries.map((g, i) => (
                                <MenuItem key={i} value={g.id}>
                                    {g.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        error={this.state.errorField === "content"}
                        label={strings.CONTENT}
                        value={this.state.content}
                        variant={"outlined"}
                        multiline
                        onChange={e => {
                            this.setState({content: e.target.value})
                        }}
                        margin="normal"
                        rows={10}
                        rowsMax={100}
                        fullWidth
                    />
                    {/* <FormControl> */}
                        <TextField
                            label={strings.PHOTO}
                            value={this.state.url}
                            onChange={e=>this.setState({url: e.target.value})}
                            margin="normal"
                            fullWidth
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={this.openUploader}>
                                        <UploadIcon/>
                                    </IconButton>
                                </InputAdornment>,
                            }}
                        />
                    <FileUploader
                        max={1}
                        isPhoto
                        photoID={this.props.match.params.id}
                        siteName={this.props.match.params.name} 
                        onDone={this.onUploadDone} 
                        open={this.state.importFiles} 
                        close={this.closeImport}
                    />
                    <img alt="photography" width="50%" src={this.state.url}/>
                    <Button onClick={this.save} fullWidth color="primary" variant="contained" style={{marginTop: 15}} type="submit">
                        {strings.SAVE}
                    </Button>
                    {this.state.error && <FormHelperText error={true}>
                        {this.state.errorMsg}
                    </FormHelperText>}
                </React.Fragment>}
            </div>
        )
    }
}

export default withRouter(EditPhoto);