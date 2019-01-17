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
import AppBar from 'components/AppBar';

import { getJWT, getUser, removeJWT } from 'utils/token';

import {
    MySites, Galleries, Contact, About
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
			main: "#0e1e25"
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
						<div className="app">
							{getJWT() && <React.Fragment>
								<AppBar/>
								{/* <DrawerMenu/> */}
							</React.Fragment>}
							<Switch>
								<Route exact path="/" render={() => getJWT() ? <MySites/> : <HomepageHome/>}/>
								<Route exact path="/signup" render={() => this.noAuth(<Authentication type="signup" />)} />
								<Route exact path="/login" render={() => this.noAuth(<Authentication type="login" />)} />

								<Route render={() => window.location = "/"}/>
							</Switch>
						</div>
					</div>
				</Router>
			</MuiThemeProvider>
		)
	}
}

export default App;