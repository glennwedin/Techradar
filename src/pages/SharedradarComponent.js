import React from 'react';
import { Provider } from 'react-redux';
import store from '../stores/Store';
import { getUserRadar } from '../actions/actions';

class SharedradarComponent extends React.Component {

	componentDidMount() {
		console.log(this.props);
		let id = this.props.params.id;
		store.dispatch(getUserRadar(id));
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
					

					
					<script type="text/javascript" src="../js/app.js"></script>
					</body>
				</html>
			</Provider>
		)
	}
}

export default SharedradarComponent;