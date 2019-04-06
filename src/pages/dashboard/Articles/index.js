import React from 'react';

import {withRouter} from 'react-router';
import strings from 'strings';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ArticleBox from 'components/ArticleBox';

import './styles.scss';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import client from 'services/client';
import CircularProgress from '@material-ui/core/CircularProgress';

class Articles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            confirmDelete: false,
            articleToDelete: {},
            fetched: false
        }
    }

    fetchArticles = () => {
        this.setState({fetched: false});
        client.get('/articles/'+this.props.match.params.name).then(response => {
            const articles = response.data.payload || [];
            articles.sort(function(a,b){
                return new Date(b.updated_at) - new Date(a.updated_at);
            });
            console.log(articles);
            this.setState({articles, fetched: true});
        }).catch(err => {
            if(err) throw err;
        });
    }

    componentDidMount() {
        this.fetchArticles();
    }

    editArticle = id => {
        this.props.history.push('/site/' + this.props.match.params.name + '/articles/edit/' + id);
    }

    handleCreateArticle = () => {
        this.props.history.push('/site/' + this.props.match.params.name + '/articles/new');
    }

    closeConfirmDelete = () => this.setState({
        confirmDelete: false
    });

    confirmDelete = article => this.setState({
        confirmDelete: true,
        articleToDelete: article
    });

    deleteArticle = () => {
        client.delete('/articles/' + this.props.match.params.name + '/' + this.state.articleToDelete.short_id).then(response => {
            this.closeConfirmDelete();
            this.fetchArticles();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        return (
            <div className="page dashboard-articles">
                <Fab onClick={this.handleCreateArticle} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_ARTICLE}
                </Fab>
                <div className="title-div">
                    <h1>{strings.DRAWER_ARTICLES}</h1>
                </div>
                {this.state.articles.length < 1 && this.state.fetched && <Button onClick={this.handleCreateArticle} variant="contained" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.NEW_ARTICLE}
                </Button>}

                {!this.state.fetched && <CircularProgress/>}
                <div className="articles-container">
                    {this.state.articles.map((article, i) => {
                        return <ArticleBox onDelete={() => this.confirmDelete(article)} key={i} onOpen={() => this.editArticle(article.short_id)} article={article}/>;
                    })}
                </div>

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
                        <Button onClick={this.deleteArticle} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Articles);