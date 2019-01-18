import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withRouter}from 'react-router';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Select from 'react-select';

import ProjectBox from 'components/ProjectBox';

import strings from 'strings';

import client from 'services/client';

import './styles.scss';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        style={{marginTop: 10}}
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }
  
  const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
  };

class Projects extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            languages: [],
            dialogOpen: false,
            confirmDelete: false,
            titles: [],
            descriptions: [],
            url: "",
            id: "",
            short_id: ""
        }
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = () => {
        client.get('/projects/'+ this.props.match.params.name).then(response => {
            const projects = response.data.payload || [];
            this.setState({projects});
        }).catch(err => {
            if(err) throw err;
        });
    }

    fetchLanguages = () => {
        client.get('/constants/languages').then(response => {
            const languages = response.data.payload;
            languages.sort(function(a, b){
                if(a.Name < b.Name) { return -1; }
                if(a.Name > b.Name) { return 1; }
                return 0;
            })
            this.setState({languages});
        }).catch(err => {
            if(err) throw err;
        });
    }

    handleNewProject = () => {
        this.fetchLanguages();
        this.setState({
            dialogOpen: true,
            titles: [],
            descriptions: [],
            url: "",
            id: "",
            short_id: ""
        })
    };

    handleClose = () => this.setState({
        dialogOpen: false
    })

    fetchProject = id => {
        client.get('/project/'+ id).then(response => {
            const project = response.data.payload;
            this.setState({...project});
        }).catch(err => {
            if(err) throw err;
        });
    }

    editProject = project => {
        this.fetchLanguages();
        this.fetchProject(project.short_id);
        this.setState({
            dialogOpen: true,
        });
    }

    handleChangeTitle = (event, i) => {
        const value = event.target.value;
        const titles = this.state.titles;
        titles[i].content = value;
        this.setState({
            titles
        });
    }

    handleChangeDescription = (e, i) => {
        const value = e.target.value;
        const descriptions = this.state.descriptions;
        descriptions[i].content = value;
        this.setState({
            descriptions
        });
    }

    handleTitleRemove = i => {
        const titles = this.state.titles;
        titles.splice(i, 1);
        this.setState({titles});
    }
    handleTitleRemove = i => {
        const descriptions = this.state.descriptions;
        descriptions.splice(i, 1);
        this.setState({descriptions});
    }

    onTitleLanguageAdd = e => {
        const language = e.value;
        const titles = this.state.titles;
        titles.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({titles});
    }

    onDescriptionLanguageAdd = e => {
        const language = e.target.value;
        const descriptions = this.state.descriptions;
        descriptions.push({
            language_name: language.Name,
            language_code: language.Code,
            content: ""
        });
        this.setState({descriptions});
    }

    handleSave = () => {
        client.put('/projects/' + this.props.match.params.name, {
            titles: this.state.titles,
            descriptions: this.state.descriptions,
            id: this.state.id,
            short_id: this.state.short_id,
            url: this.state.url
        }).then(response => {
            this.handleClose();
            this.fetchProjects();
        }).catch(err => {
            if(err) throw err;
        });
    }
    

    openConfirmDelete = () => this.setState({
        confirmDelete: true
    });

    handleConfirmClose = () => this.setState({
        confirmDelete: false
    });

    deleteProject = () => {
        client.delete('/project/' + this.state.short_id).then(response => {
            this.fetchProjects();
            this.handleConfirmClose();
            this.handleClose();
        }).catch(err => {
            if(err) throw err;
        });
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                font: 'inherit',
              },
            }),
          };
        return (
            <div className="page dashboard-projects">
                <Fab onClick={this.handleNewProject} className="fab" variant="extended" color="primary" aria-label="Add">
                    <AddIcon />
                    {strings.PROJECTS_NEW_PROJECT}
                </Fab>
                <h1>{strings.DRAWER_PROJECTS}</h1>
                <div className="projects-container">
                    {this.state.projects.map((project, i) => {
                        return <ProjectBox key={i} onOpen={() => this.editProject(project)} project={project}/>;
                    })}
                </div>

                <Dialog
                    fullScreen
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    >
                    <AppBar className="topbar">
                        <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={{flex: 1}}>
                            {this.state.id ? strings.PROJECT_EDIT : strings.PROJECTS_NEW_PROJECT}
                        </Typography>
                        <Button style={{marginRight: 15}} className="button-danger-outlined" variant="outlined" onClick={this.openConfirmDelete}>
                            {strings.DELETE}
                        </Button>
                        <Button color="secondary" variant="contained" onClick={this.handleSave}>
                            {strings.SAVE}
                        </Button>
                        </Toolbar>
                    </AppBar>
                    <DialogContent className="dialog-content">
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                        <div className="title-div">
                                            <h1>{strings.TITLES}</h1>
                                            <FormControl fullWidth>
                                                {/* <InputLabel>{strings.ADD_TRANSLATION}</InputLabel> */}
                                                {/* <Select
                                                    value={""}
                                                    onChange={this.onTitleLanguageAdd}
                                                    >
                                                    {this.state.languages.map((lang, i) => {
                                                        return ( 
                                                            <MenuItem key={i} value={lang}>{lang.Name}</MenuItem>
                                                        )
                                                    })}
                                                </Select> */}
                                            <Select
                                                classes={classes}
                                                styles={selectStyles}
                                                options={this.state.languages.map(l => ({value: l, label: l.Name}))}
                                                components={components}
                                                value={""}
                                                onChange={this.onTitleLanguageAdd}
                                                placeholder={strings.ADD_TRANSLATION}
                                                isClearable
                                                />
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    {this.state.titles.map((title, i) => (
                                        <Grid key={i} item xs={12} md={8}>
                                            <TextField
                                                label={title.language_name}
                                                variant="outlined"
                                                value={title.content}
                                                onChange={e => this.handleChangeTitle(e, i)}
                                                margin="dense"
                                                fullWidth
                                                InputProps={{
                                                endAdornment: (
                                                    <InputAdornment className="remove-button" position="end">
                                                        {this.state.titles.length > 1 && <RemoveCircle
                                                            onClick={() => this.handleTitleRemove(i)}
                                                        >
                                                        </RemoveCircle>}
                                                    </InputAdornment>
                                                )
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                    {this.state.error && <FormHelperText error={true}>
                                        {this.state.errorMsg}
                                    </FormHelperText>}
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="column">
                                    <Grid item xs={12} md={8}>
                                        <div className="title-div">
                                            <h1>{strings.DESCRIPTIONS}</h1>
                                            <FormControl fullWidth>
                                                <InputLabel>{strings.ADD_TRANSLATION}</InputLabel>
                                                <Select
                                                    value={""}
                                                    onChange={this.onDescriptionLanguageAdd}
                                                    >
                                                    {this.state.languages.map((lang, i) => {
                                                        return ( 
                                                            <MenuItem key={i} value={lang}>{lang.Name}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </Grid>
                                    {this.state.descriptions.map((desc, i) => (
                                        <Grid key={i} item xs={12} md={8}>
                                            <TextField
                                                label={desc.language_name}
                                                variant="outlined"
                                                multiline
                                                value={desc.content}
                                                onChange={e => this.handleChangeDescription(e, i)}
                                                margin="dense"
                                                fullWidth
                                                InputProps={{
                                                endAdornment: (
                                                    <InputAdornment className="remove-button" position="end">
                                                        {this.state.descriptions.length > 1 && <RemoveCircle
                                                            onClick={() => this.handleDescriptionRemove(i)}
                                                        >
                                                        </RemoveCircle>}
                                                    </InputAdornment>
                                                )
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                    {this.state.error && <FormHelperText error={true}>
                                        {this.state.errorMsg}
                                    </FormHelperText>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={this.state.confirmDelete}
                    onClose={this.handleConfirmClose}
                    >
                    <DialogTitle>{strings.DELETE_PROJECT}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {strings.CONFIRM_DELETE_PROJECT_DESCRIPTION}             
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            {strings.CANCEL}
                        </Button>
                        <Button size="large" onClick={this.deleteProject} className="button-danger">
                            {strings.DELETE}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(withStyles(styles, { withTheme: true })(Projects));