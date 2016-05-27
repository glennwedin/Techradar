import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts, addToRadar } from '../actions/actions';
import ResultComponent from './ResultComponent';
import TechitemsComponent from './TechitemsComponent';

class AdditemComponent extends React.Component{
	constructor(props) {
		super(props);

		this.displayName = "AdditemComponent";
	}

	componentDidMount() {
		let els = document.getElementsByClassName('c')
		els = Array.prototype.slice.call(els); //NodeList to Array hack
		els.forEach(function (el, i) {
			el.addEventListener('click', function () {
				els.forEach(function (elmnt, i) {
					elmnt.classList.remove('selected');
				});
				el.classList.add('selected')
			}, true);
		});
	}

	addToRadar(e) {
		e.preventDefault();
		let el = ReactDOM.findDOMNode(this),
		action = el.querySelector('[name="actions"]').value,
		name  = el.querySelector('[name="name"]').value,
		description = el.querySelector('[name="description"]').value;

		this.props.dispatch(addToRadar(action, {
			name: name,
			description: description
		}));
	}

	render () {
		return (
			<div className="layout">
				<div className="medium-3 columns">
					<div className="tab">
						<Link className="tab-item" to="/radar">Search Github</Link>
						<Link className="tab-item" to="/additem">Add your own</Link>
					</div>
					<form id="additem">
						<input type="text" name="name" placeholder="Title" />
						<select name="actions">
							<option value="hold">Hold</option>
							<option value="assess">Assess</option>
							<option value="trial">Trial</option>
							<option value="adopt">Adopt</option>
						</select>
						<textarea placeholder="Description" name="description"></textarea>
						<input type="submit" value="Add to radar" className="button" onClick={this.addToRadar.bind(this)} />
					</form>
				</div>
				<div className="medium-1 columns">
					&nbsp;
				</div>
				<div className="medium-7 columns">
					<div className="right">
						<div className="c _1 selected">
							<TechitemsComponent type="hold" user={this.props.user.user} />
							<div className="c _2">
								<TechitemsComponent type="assess" user={this.props.user.user} />
								<div className="c _3">
									<TechitemsComponent type="trial" user={this.props.user.user} />
									<div className="c _4">
										<TechitemsComponent type="adopt" user={this.props.user.user} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
AdditemComponent = connect(state => state)(AdditemComponent);
export default AdditemComponent;