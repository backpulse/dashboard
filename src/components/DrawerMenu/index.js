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
import ArrowBack from '@material-ui/icons/ArrowBack';
import OverviewIcon from '@material-ui/icons/RemoveRedEye';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import LockIcon from '@material-ui/icons/Lock';
import ExtensionIcon from '@material-ui/icons/Extension';
import ArticleIcon from '@material-ui/icons/Folder';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import StorageIcon from '@material-ui/icons/Storage';

import Hidden from '@material-ui/core/Hidden';

import {Link, withRouter} from 'react-router-dom';

import { removeJWT } from 'utils/token';

import './styles.scss';

import strings from 'strings';
import CircularProgress from '@material-ui/core/CircularProgress';

class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            confirmSignoutAlert: false,
            mobileOpen: false
        }

        setTimeout(() => {
            this.forceUpdate();
        }, 1500);
    }

    handleClose = () => this.setState({confirmSignoutAlert: false});

    signOut = () => {
        removeJWT();
        window.location = "/login";
    }


    handleDrawerToggle = () => this.setState({mobileOpen: true});
    handleMobileClose = () => this.setState({mobileOpen: false});

    hasModule = moduleName => {
        const modules = this.props.site.modules;
        for(let i = 0; i < modules.length; i++) {
            if(modules[i] === moduleName) {
                return true;
            }
        }
        return false
    }

    getDrawer = () => {
        const routes = [
            {
                path: "/site/" + this.props.match.params.name,
                icon: <OverviewIcon/>,
                text: strings.DRAWER_OVERVIEW,
                show: true
            },
            {
                divider: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/articles",
                icon: <ArticleIcon/>,
                text: strings.DRAWER_ARTICLES,
                show: this.hasModule("articles")

            },
            {
                path: "/site/" + this.props.match.params.name + "/projects",
                icon: <LibraryBooks/>,
                text: strings.DRAWER_PROJECTS,
                show: this.hasModule("projects")

            },
            {
                path: "/site/" + this.props.match.params.name + "/galleries",
                icon: <PhotoLibrary/>,
                text: strings.DRAWER_GALLERIES,
                show: this.hasModule("galleries")

            },
            {
                path: "/site/" + this.props.match.params.name + "/videogroups",
                icon: <VideoLibraryIcon/>,
                text: strings.DRAWER_VIDEOS,
                show: this.hasModule("videos")
            },
            {
                path: "/site/" + this.props.match.params.name + "/albums",
                icon: <LibraryMusicIcon/>,
                text: strings.DRAWER_MUSIC,
                show: this.hasModule("music")
            },
            {  
                divider: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/about",
                icon: <AboutIcon/>,
                text: strings.DRAWER_ABOUT,
                show: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/contact",
                icon: <ContactIcon/>,
                text: strings.DRAWER_CONTACT,
                show: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/storage",
                icon: <StorageIcon/>,
                text: strings.DRAWER_STORAGE,
                show: true
            },
            {
                divider: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/modules",
                icon: <ExtensionIcon/>,
                text: strings.DRAWER_MODULES,
                show: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/access",
                icon: <LockIcon/>,
                text: strings.DRAWER_ACCESS,
                show: true
            },
            {
                path: "/site/" + this.props.match.params.name + "/settings",
                icon: <SettingsIcon/>,
                text: strings.DRAWER_SETTINGS,
                type: "all",
                show: this.props.site.role === "owner"
            },
            {
                divider: true
            },
            {
                path: "/",
                icon: <ArrowBack/>,
                text: strings.MENU_MY_SITES,
                show: true
            }
        ];
        return (
            <div>
                <Divider />
                <List>
                    {routes.map((route, i) => {
                        if(route.divider) {
                            return <Divider style={{marginBottom: 10, marginTop: 10}} key={i}/>
                        } else if(route.show) {
                            return <Link key={i} to={route.path}>
                                <ListItem className={["list-item", this.isActive(route) ? "active": ""].join(" ")} button>
                                    <ListItemIcon>
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText className="route-text" inset primary={route.text} />
                                </ListItem>
                            </Link> 
                        } else {
                            return null;
                        }
                    })}
                </List>
            </div>
        )
    }

    isActive = route => {
        const fullRoute = this.props.location.pathname;
        return (route.path === fullRoute);
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

        window.addEventListener("menu-toggle", this.handleDrawerToggle);
    }

    componentWillUnmount() {
        window.removeEventListener("menu-toggle", this.handleDrawerToggle);
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
                        <div className="toolbar">
                        <h1>Backpulse</h1>
                        </div>
                        {!this.props.site.name && <div className="progress-container">
                            <CircularProgress/>
                        </div>}
                        {this.props.site.name && this.getDrawer()}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        className="drawer-paper">
                        <div className="toolbar"/>
                        {!this.props.site.name && <div className="progress-container">
                            <CircularProgress/>
                        </div>}
                        {this.props.site.name && this.getDrawer()}
                    </Drawer>
                </Hidden>
            </div>
        )
    }
}

export default withRouter(props => <DrawerMenu {...props}/>);