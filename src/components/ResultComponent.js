import React from 'react';
import { connect } from 'react-redux';
import { addToRadar } from '../actions/actions';
import store from '../stores/Store';

class RadarComponent extends React.Component{

	constructor (props) {
		super(props);

		this.state = {
			toggleMenu: false
		}
	}

	toggleMenu () {
		this.setState({
			toggleMenu: !this.state.toggleMenu
		});
	}

	menuClick (e) {
		let action = e.target.getAttribute('data-action');
		store.dispatch(addToRadar(action, this.props.obj));
	}

	render () {
		let menu = '';
		if(this.state.toggleMenu) {
			menu = (
				<ul className="minimenu">
					<li onClick={this.menuClick.bind(this)} data-action="hold">Hold</li>
					<li onClick={this.menuClick.bind(this)} data-action="assess">Assess</li>
					<li onClick={this.menuClick.bind(this)} data-action="trial">Trial</li>
					<li onClick={this.menuClick.bind(this)} data-action="adopt">Adopt</li>
				</ul>
			)
		}
		return (
			<div>
				<div className="avatar"><img src={this.props.obj.owner.avatar_url} width="40" /></div>
				<div className="name">{this.props.obj.full_name}</div>
				<div className="ion-drag" onClick={this.toggleMenu.bind(this)}>
					{menu}
				</div>
			</div>
		)
	}
}

export default RadarComponent;