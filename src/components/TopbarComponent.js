import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { addItem } from '../actions/actions';

class TopbarComponent extends React.Component{

	constructor () {
		super();
	}

	componentDidMount() { 
	}
	
	componentDidUpdate(prevProps, prevState) { 
	}

	render () {
		let id = null;
		if(this.props.user.user) {
			id = this.props.user.user._id;
		}

		let share = id ? <a target="_blank" href={"./radar/"+id} className="sharelink ion-share"></a> : "";

		return (
			<div className="logobar">
				<span className="ccolor">Tech</span><span className="ccolor cweight">Radar</span>
				{share}
			</div>
		)
	}
}
TopbarComponent = connect(state => state)(TopbarComponent);
export default TopbarComponent;