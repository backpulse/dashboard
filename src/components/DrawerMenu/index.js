import React from 'react';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import LibraryBooks from '@material-ui/icons/LibraryBooks';
import SettingsIcon from '@material-ui/icons/Settings';
import ContactIcon from '@material-ui/icons/ContactMail';
import AboutIcon from '@material-ui/icons/PermIdentity';
import ExitIcon from '@material-ui/icons/ExitToAppOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ImportContacts from '@material-ui/icons/ImportContacts';
import OverviewIcon from '@material-ui/icons/RemoveRedEye';

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

import strings from 'strings';
import { map } from 'rsvp';


class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            confirmSignoutAlert: false,
            mobileOpen: false
        }
        console.log(this.props);
    }

    handleClose = () => this.setState({confirmSignoutAlert: false});

    signOut = () => {
        removeJWT();
        window.location = "/login";
    }


    handleDrawerToggle = () => this.setState({mobileOpen: true});
    handleMobileClose = () => this.setState({mobileOpen: false});

    getDrawer = () => {
        const routes = [
            {
                path: "/site/" + this.props.match.params.name,
                icon: <OverviewIcon/>,
                text: strings.DRAWER_OVERVIEW
            },
            {
                path: "/site/" + this.props.match.params.name + "/projects",
                icon: <LibraryBooks/>,
                text: strings.DRAWER_PROJECTS
            },
            {
                path: "/site/" + this.props.match.params.name + "/about",
                icon: <AboutIcon/>,
                text: strings.DRAWER_ABOUT
            },
            {
                path: "/site/" + this.props.match.params.name + "/contact",
                icon: <ContactIcon/>,
                text: strings.DRAWER_CONTACT,
            },
            {
                path: "/site/" + this.props.match.params.name + "/settings",
                icon: <SettingsIcon/>,
                text: strings.DRAWER_SETTINGS,
            },
            {
                divider: true
            },
            {
                path: "/",
                icon: <ArrowBack/>,
                text: strings.MENU_MY_SITES
            }
        ];
        return (
            <div>
                <Divider />
                <List>
                    {routes.map((route, i) => route.divider ? <Divider style={{marginBottom: 10, marginTop: 10}} key={i}/> : (
                        <Link key={i} to={route.path}>
                            <ListItem className="list-item" button>
                                <ListItemIcon>
                                    {route.icon}
                                </ListItemIcon>
                                <ListItemText inset primary={route.text} />
                            </ListItem>
                        </Link> 
                    ))}
                </List>
            </div>
        )
    }

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
                        {this.getDrawer()}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        className="drawer-paper">
                        <div className="toolbar"/>
                        {this.getDrawer()}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

export default withRouter(props => <DrawerMenu {...props}/>);