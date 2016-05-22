import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import MainComponent from "../pages/MainComponent";
import SigninComponent from "../components/SigninComponent";
import RadarComponent from '../components/RadarComponent';
import AdditemComponent from "../components/AdditemComponent";
import SharedradarComponent from "../pages/SharedradarComponent";

var mainroute = (history) => {
	history = history || null;
	/*
		<Route path="/methodology" component={MainComponent} />
					<Route path="/tools" component={MainComponent} />
	*/
	return (
			<Router history={history}>
				<Route path="/" component={MainComponent} >
					<IndexRoute component={SigninComponent} />
					<Route path="/radar" component={RadarComponent} />
					<Route path="/additem" component={AdditemComponent} />
				</Route>
				<Route path="/radar/:id" component={SharedradarComponent} />
			</Router>
		);
};

export default mainroute;