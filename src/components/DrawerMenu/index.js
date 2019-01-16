import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactIcon from '@material-ui/icons/ContactMail';
import AboutIcon from '@material-ui/icons/ContactSupport';
import ExitIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ImportContacts from '@material-ui/icons/ImportContacts';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';

import {Link, withRouter} from 'react-router-dom';

import { removeJWT } from 'utils/token';

import './styles.scss';

const drawer = (
    <div>
        <Divider />
        <List>
            <Link to="/homepage">
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Page d'accueil" />
                </ListItem>
            </Link>
            <Link to="/galleries">
                <ListItem button>
                    <ListItemIcon>
                        <PhotoAlbumIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Galeries" />
                </ListItem>
            </Link>
            <Link to="/work">
                <ListItem button>
                    <ListItemIcon>
                        <ImportContacts />
                    </ListItemIcon>
                    <ListItemText inset primary="Publications" />
                </ListItem>
            </Link>
            <Link to="/contact">
                <ListItem button>
                    <ListItemIcon>
                        <ContactIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Page contact" />
                </ListItem>
            </Link>
            <Link to="/about">
                <ListItem button>
                    <ListItemIcon>
                        <AboutIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Page à propos" />
                </ListItem>
            </Link>
        </List>
        {/* <Divider />
        <List>
            <Link to="/settings">
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="Configuration" />
                </ListItem>
            </Link>
        </List> */}
    </div>
);

class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            confirmSignoutAlert: false,
            mobileOpen: false
        }
    }

    handleClose = () => this.setState({confirmSignoutAlert: false});

    signOut = () => {
        removeJWT();
        window.location = "/login";
    }


    handleDrawerToggle = () => this.setState({mobileOpen: true});
    handleMobileClose = () => this.setState({mobileOpen: false});

    componentDidMount() {
        
        const getRouteName = path => {
            let title;
            const rootPath = path.pathname.split("/")[1];
            switch (rootPath) {
                case "homepage":
                title = "Page d'accueil";
                break;
                case "galleries":
                title = "Galeries"
                break;
                case "photos":
                title = "Photographies";
                break;
                case "contact":
                title = "Page contact";
                break;
                case "work":
                title="Publications";
                break;
                case "about":
                title = "Page à propos";
                break;
                case "settings":
                title = "Paramètres";
                break;
                default:
                break;
            }
            this.setState({appBarTitle: title});
        }
        getRouteName(this.props.location);;
        
        this.props.history.listen(route => {
            getRouteName(route);
        });
    }

    render() {
        return (
            <div>
                <AppBar position="fixed" className="app-bar">
                    <Toolbar>
                        <IconButton
                            className="hide-desktop"
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            {this.state.appBarTitle}
                        </Typography>
                        <IconButton onClick={() => {
                            this.setState({confirmSignoutAlert: true});
                        }} className="right signout-icon">
                            <ExitIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        onClick={this.handleMobileClose}
                        anchor="left"
                        variant="temporary"
                        className="drawer-paper mobile"
                        open={this.state.mobileOpen}
                        onClose={this.handleMobileClose}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                          }}
                        >
                        <div className="toolbar"/>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        className="drawer-paper">
                        <div className="toolbar"/>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Dialog
                    open={this.state.confirmSignoutAlert}
                    onClose={this.handleClose}>
                    <DialogTitle>{"Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText variant="body1">
                            Êtes-vous certain de vouloir vous déconnecter ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Annuler
                        </Button>
                        <Button onClick={this.signOut} color="secondary" >
                            Se déconnecter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(props => <DrawerMenu {...props}/>);