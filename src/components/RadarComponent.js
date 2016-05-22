import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/actions';
import ResultComponent from './ResultComponent';
import TechitemsComponent from './TechitemsComponent';

class RadarComponent extends React.Component{
	constructor(props) {
		super(props);

		this.displayName = "RadarComponent";
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

	searchGithub (e) {
		if(e.charCode === 13) {
			let value = e.target.value;
			this.props.dispatch(fetchPosts({
				query: value,
				language: 'javascript'
			}));
		}
	}

	render () {
		let items = [];
		if(this.props.repos.repos.items) {
			items = this.props.repos.repos.items
		}

		let results = [];
		items.forEach((obj, i) => {
			if(i < 8) {
				results.push(<ResultComponent key={obj.id} obj={obj} />)
			}
		})

		return (
			<div className="layout">
				<div className="medium-3 columns">
					<div className="tab">
						<Link className="tab-item" to="/radar">Search Github</Link>
						<Link className="tab-item" to="/additem">Add your own</Link>
					</div>
					<input type="text" placeholder="Search Github" className="search" onKeyPress={this.searchGithub.bind(this)}/>
					<div className="searchResults">
						{results}
					</div>
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
RadarComponent = connect(state => state)(RadarComponent);
export default RadarComponent;