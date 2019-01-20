import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import client from 'services/client';

import async from 'async';
import strings from 'strings';
class FileUploader extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            publishing: false,
            files: [],
            completed: 0
        }
    }

    componentWillReceiveProps() {
        /* Reset */
        this.setState({
            files: [],
            completed: 0
        });
    }
    
    upload = (file, cb) => {
        const formData = new FormData();
        formData.append("image", file, file.name);
        formData.append("is_gallery", this.props.isGallery);
        formData.append("is_project", this.props.isProject);
        formData.append("gallery_id", this.props.galleryID);
        formData.append("project_id", this.props.projectID);

        client.post("/photos", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            cb(response.data);
        }).catch(err => {
            if(err) {
                this.setState({publishing: false, error: err.message});
            }
        });
    }

    handleSubmit = () => {
        const files = document.getElementById("fileInput").files;
        this.setState({publishing: true});

        let completed = 0;
        const uploadedPictures = [];
        async.eachSeries(files, (file, next) => {
            this.upload(file, data => {
                uploadedPictures.push(data);
                console.log(uploadedPictures);
                completed++;
                this.setState({completed});
                next();
            });
        }, () => {
            this.setState({publishing: false}, () => {
                console.log(uploadedPictures);
                this.props.onDone(uploadedPictures);
            });
        });
    }

    handleImageSelect = () => {
        const fileInput = document.getElementById("fileInput");

        fileInput.addEventListener("change", () => {
            const files = fileInput.files;

            if(this.props.max) {
                if(files.length > this.props.max) {
                    alert(strings.TOO_MANY_PICTURES);
                    fileInput.value = "";
                }
            }
            this.setState({canPublish: files.length > 0, files})
        });

        fileInput.click();
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.state.publishing ? null : this.props.close}
                fullWidth
            >
            <DialogTitle>{strings.IMPORT_PHOTOS}</DialogTitle>
            <DialogContent>

                <DialogContentText variant="body1">
                    {strings.IMPORT_PHOTOS_DESCRIPTION}
                </DialogContentText>

                <div style={{display: "flex", alignItems:"center"}}>
                    <Button  disabled={this.state.publishing} onClick={this.handleImageSelect} size="large" style={{marginTop: 15}} variant="contained" color="primary">{strings.IMPORT_PHOTOS}</Button>
                    
                    {this.props.max && this.state.files < 1 && <Typography style={{paddingTop: 15, paddingLeft: 10}}variant="body1">{this.props.max} max</Typography>}
                    {this.state.files.length > 0 && <Typography style={{paddingTop: 15, paddingLeft: 10}} variant="body1">{this.state.files.length} {strings.FILES}</Typography>}
                </div>
                {this.state.publishing && (
                    <div className="progress">
                        <CircularProgress className="circular" size={35} />
                        <Typography variant="body1">{this.state.completed} / {this.state.files.length}</Typography>
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <Button disabled={this.state.publishing} onClick={this.props.close} color="primary">
                    {strings.CANCEL}
                </Button>
                <Button disabled={this.state.publishing || this.state.files.length < 1} onClick={this.handleSubmit} variant="contained" color="secondary">
                    {strings.ADD}
                </Button>
            </DialogActions>
            <input multiple id="fileInput" type="file" accept="image/*"/>
            </Dialog>
        )
    }   
}

export default FileUploader;