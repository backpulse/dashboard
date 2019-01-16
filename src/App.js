import React from 'react';

import {
	BrowserRouter as Router,
	Switch,
    Route,
    Redirect
} from 'react-router-dom';

import {
	MuiThemeProvider,
	createMuiTheme
} from '@material-ui/core/styles';

import DrawerMenu from 'components/DrawerMenu';

import { getJWT, getUser, removeJWT } from 'utils/token';

import {
    Home as DashboardHome, Galleries, Contact, About
} from 'pages/dashboard/index.js';

import {
    Home as HomepageHome, Authentication
} from 'pages/homepage';


const theme = createMuiTheme({
	typography: {
	  useNextVariants: true,
	},
	palette: {
		primary: {
			main: "#272b35"
		},
		secondary: {
			main: "#1abc9c",
			contrastText: "white"
		}
	}
});


class App extends React.Component {

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
						{!getJWT() && <Switch>
							<Route exact path="/" render={() => this.noAuth(<HomepageHome />)} />
							<Route exact path="/signup" render={() => this.noAuth(<Authentication type="signup" />)} />
							<Route exact path="/login" render={() => this.noAuth(<Authentication type="login" />)} />

							{/* <Route render={() => window.location = "/"}/> */}
						</Switch>}
						<div className="app">

                            {getJWT() && <Switch>
                                <Route exact path="/" render={() => this.requireAuth(<DashboardHome/>)}/>
                            </Switch>}
						</div>
					</div>
				</Router>
			</MuiThemeProvider>
		)
	}
}

export default App;