import React from "react";
import { Link, browserHistory } from "react-router";
import TopbarComponent from '../components/TopbarComponent';
import RadarComponent from '../components/RadarComponent';
import SigninComponent from '../components/SigninComponent';
import { Provider } from 'react-redux';
import { validateUser } from '../actions/actions';

import store from '../stores/Store';

class MainComponent extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			user: null
		};
	}

	componentDidMount() {
		store.subscribe(() => {
			let state = store.getState();

			this.setState({
				user: state.user.user
			}, () => {
				if(this.state.user) {
					if(this.props.location.pathname.length > 1) {
						browserHistory.push(this.props.location.pathname);
					} else {
						browserHistory.push('/radar');
					}
				} else {
					browserHistory.push('/');
				}
			});
		});
		store.dispatch(validateUser());
	}

	render () {

		return (
				<Provider store={store}>
					<html lang="en">
					<head>
						<meta charSet="UTF-8" />
						<title>TekRaydr</title>
						<link rel="stylesheet" type="text/css" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
					</head>
					<body>
						<TopbarComponent />
						
						<Provider store={store}>
							{this.props.children}
						</Provider>
						
						<script type="text/javascript" src="js/app.js"></script>
						</body>
					</html>
				</Provider>
			);
	}
}
export default MainComponent;