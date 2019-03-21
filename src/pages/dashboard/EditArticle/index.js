import React from 'react';

import {withRouter} from 'react-router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import strings from 'strings';
import Grid from '@material-ui/core/Grid';

import Markdown from 'react-markdown/lib/react-markdown';

import highlight from 'highlight.js';
import DialogContent from '@material-ui/core/DialogContent';

import './styles.scss';
import 'highlight.js/styles/atom-one-dark.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import client from 'services/client';
import CircularProgress from '@material-ui/core/CircularProgress';

class EditArticle extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            errorField: "",
            error: false,
            fetched: false,
            confirmDelete: false,
            // Article data
            title: "",
            content: "## My new article",
            // meta
            id: "",
            short_id: ""
        }
    }

    fetchArticle = () => {
        const id = this.props.match.params.id;
        this.setState({fetched: false});
        client.get('/articles/' + this.props.match.params.name + '/' + id).then(response => {
            console.log(response.data);
            const article = response.data.payload;
            this.setState({...article, fetched: true}, () => this.showColors());
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        if(!this.props.new) {
            this.fetchArticle();
        }
    }

    onType = e => {
        this.setState({content: e.target.value}, () => this.showColors());
        
    }

    showColors = () => {
        const elements = document.getElementsByTagName("code");
        for(let i = 0; i < elements.length; i++) {
            const element = elements[i];
            highlight.highlightBlock(element);
        }
    }

    handleSave = () => {
        console.log("isUpdate?", !this.props.new);
        console.log(this.props.match.params);
        const article = {
            title: this.state.title,
            content: this.state.content,
            short_id: this.state.short_id,
            id: this.state.id
        }
        client.put('/articles/'+this.props.match.params.name, article).then(response => {
            console.log(response.data);
        }).catch(err => {
            if(err) throw err;
        });
    }

    closeConfirmDelete = () => this.setState({
        confirmDelete: false
    });

    confirmDelete = () => this.setState({
        confirmDelete: true
    });

    deleteArticle = () => {
        client.delete('/articles/' + this.props.match.params.name + '/' + this.state.short_id).then(response => {
            this.closeConfirmDelete();
            this.props.history.push('/site/' + this.props.match.params.name + '/articles');
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-edit-article">
                <h1>{this.props.new ? strings.NEW_ARTICLE : strings.EDIT_ARTICLE}</h1>
                {!this.state.fetched && !this.props.new && <CircularProgress/>}
                {(this.props.new || this.state.fetched) && (
                    <React.Fragment>
                        <TextField
                            error={this.state.errorField === "title"}
                            label={strings.TITLE}
                            value={this.state.title}
                            multiline
                            onChange={e => this.setState({title: e.target.value})}
                            margin="normal"
                            variant={"outlined"}
                            fullWidth
                        />
                        <Grid spacing={16} container>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    className="overflow-hidden"
                                    error={this.state.errorField === "content"}
                                    label={strings.CONTENT}
                                    value={this.state.content}
                                    variant={"outlined"}
                                    multiline
                                    onChange={this.onType}
                                    margin="normal"
                                    rows={25}
                                    rowsMax={50}
                                    onKeyDown={e => {
                                        console.log(e.keyCode)
                                        if(e.keyCode === 9) {
                                            e.preventDefault();
                                            this.setState({content: this.state.content + "    "})
                                        }
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Markdown className="markdown-preview" source={this.state.content}/>    
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button fullWidth color="primary" variant="contained" style={{marginTop: 15}} onClick={this.handleSave}>
                                {strings.SAVE}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={3}> 
                            <Button fullWidth className="button-danger" variant="contained" style={{marginTop: 15}} onClick={this.confirmDelete}>
                                {strings.DELETE}
                            </Button>
                        </Grid>
                    </React.Fragment>
                )}

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.closeConfirmDelete}
                    >
                    <DialogTitle>{strings.DELETE_ARTICLE}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_ARTICLE_DESCRIPTION}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeConfirmDelete} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button size="large" onClick={this.deleteArticle} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(EditArticle);