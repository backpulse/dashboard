import React from 'react';

import {
	BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom';

import {
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles';

import { getJWT, getUser, removeJWT } from 'utils/token';

import {
	MySites, 
	SiteEditor, 
	Projects, 
	Contact, 
	About, 
	Settings, 
	Overview, 
	Galleries,
	EditProject, 
	EditGallery, 
	MyAccount, 
	Access,
	Modules,
	Articles,
	EditArticle,
	Videos
} from 'pages/dashboard';

import {
    Authentication
} from 'pages/homepage';

import {getTheme} from 'utils';

const theme = createMuiTheme({
	typography: {
	  useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#00ad9f",
			contrastText: "#e3e3e3"
		},
		secondary: {
			main: "#0e1e25",
			contrastText: "#e3e3e3"
		},
		text: {
			primary: "#e3e3e3",
			secondary: "#e3e3e3"
		},
		background: {
			paper: "#0e1e25"
		},
		type: "dark"
	}
});

const themeLight = createMuiTheme({
	typography: {
	  useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#0e1e25",

		},
		secondary: {
			main: "#00ad9f",
		},
		type: "light"
	},
});


class App extends React.Component {

	constructor(props) {
		super(props);
		this.switch = React.createRef();
	}

    requireAuth = Component => {
        if(getJWT()) {
            return Component;
        }
        return <Redirect to="/login"/>;
    }

    noAuth = Component => {
        if(!getJWT()) {
            return Component;
        }
        return <Redirect to="/"/>
    }

	componentWillMount() {
		window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

		const user = getUser();
		if(user) {
			if(Date.parse(user.exp) - Date.now() < 0) {
				removeJWT();
				window.location = "/login";
			}
		}
	}

	updateTheme = () => {
		this.forceUpdate();
	}

	render() {
		return (
			<Router>
				<div className="app-container">
					<div className={["app", getTheme()].join(" ")}>
						<MuiThemeProvider theme={themeLight}>
							<Route path="/signup" render={() => this.noAuth(<Authentication type="signup" />)} />
							<Route path="/login" render={() => this.noAuth(<Authentication type="login" />)} />
							{!getJWT() && <Route exact path="/" render={() => <Redirect to="/login"/>}/>}
						</MuiThemeProvider>

						{getJWT() && <MuiThemeProvider theme={getTheme() === "dark" ? theme : themeLight}>
							<Route exact path="/" render={() => <MySites updateTheme={this.updateTheme}/>}/>
							<Route exact path="/account" render={() => this.requireAuth(<MyAccount updateTheme={this.updateTheme}/>)}/>
							<Route path="/site/:name" render={({ match: { url } }) => (
								<React.Fragment>
									<Route path="/site/:name" render={() => this.requireAuth(<SiteEditor updateTheme={this.updateTheme}/>)}/>
									<Route exact path="/site/:name" render={() => this.requireAuth(<Overview/>)}/>
									
									<Route path="/site/:name/projects" render={() => this.requireAuth(<Projects/>)}/>
									<Route path="/site/:name/access" render={() => this.requireAuth(<Access/>)}/>
									<Route path="/site/:name/modules" render={() => this.requireAuth(<Modules forceRender={() => this.forceUpdate}/>)}/>
									
									<Route path="/site/:name/projects/new" render={() => this.requireAuth(<EditProject new/>)}/>
									<Route path="/site/:name/projects/edit/:id" render={() => this.requireAuth(<EditProject/>)}/>

									<Route exact path="/site/:name/videos" render={() => this.requireAuth(<Videos/>)}/>

									<Route path="/site/:name/galleries" render={() => this.requireAuth(<Galleries/>)}/>
									<Route path="/site/:name/galleries/:id" render={() => this.requireAuth(<EditGallery/>)}/>

									<Route exact path="/site/:name/articles" render={() => this.requireAuth(<Articles/>)}/>
									<Route path="/site/:name/articles/new" render={() => this.requireAuth(<EditArticle new/>)}/>
									<Route path="/site/:name/articles/edit/:id" render={() => this.requireAuth(<EditArticle/>)}/>

									<Route path="/site/:name/about" render={() => this.requireAuth(<About/>)}/>
									<Route path="/site/:name/contact" render={() => this.requireAuth(<Contact/>)}/>
									<Route path="/site/:name/settings" render={() => this.requireAuth(<Settings/>)}/>
								</React.Fragment>
							)}/>
						</MuiThemeProvider>}
					</div>
				</div>
			</Router>
		)
	}
}

export default App;