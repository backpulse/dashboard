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
    MySites, SiteEditor, Projects, Contact, About, Settings, Overview, Galleries, EditProject, EditGallery
} from 'pages/dashboard';

import {
    Home as HomepageHome, Authentication
} from 'pages/homepage';

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
		background: {
			paper: "#0e1e25"
		},
		type: "dark"
	}
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


	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Router>
					<div className="app-container">
						<div className="app">
							<Route exact path="/" render={() => getJWT() ? <MySites/> : <HomepageHome/>}/>
							<Route path="/signup" render={() => this.noAuth(<Authentication type="signup" />)} />
							<Route path="/login" render={() => this.noAuth(<Authentication type="login" />)} />
							
							<Route path="/site/:name" render={({ match: { url } }) => (
								<React.Fragment>
									<Route exact path="/site/:name" render={() => this.requireAuth(<Overview/>)}/>
									<Route path="/site/:name" render={() => this.requireAuth(<SiteEditor/>)}/>
									
									<Route path="/site/:name/projects" render={() => this.requireAuth(<Projects/>)}/>
									<Route path="/site/:name/projects/new" render={() => this.requireAuth(<EditProject new/>)}/>
									<Route path="/site/:name/projects/edit/:id" render={() => this.requireAuth(<EditProject/>)}/>

									<Route path="/site/:name/galleries" render={() => this.requireAuth(<Galleries/>)}/>
									<Route path="/site/:name/galleries/:id" render={() => this.requireAuth(<EditGallery/>)}/>

									<Route path="/site/:name/about" render={() => this.requireAuth(<About/>)}/>
									<Route path="/site/:name/contact" render={() => this.requireAuth(<Contact/>)}/>
									<Route path="/site/:name/settings" render={() => this.requireAuth(<Settings/>)}/>
								</React.Fragment>
							)}/>

							{/* <Route render={() => window.location = "/"}/> */}
						</div>
					</div>
				</Router>
			</MuiThemeProvider>
		)
	}
}

export default App;