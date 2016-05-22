import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { deleteFromRadar } from '../actions/actions';

class TechitemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'TechitemComponent';
        
        let items = this.getTechItems(this.props.type);
        this.state = {
        	items: items || [],
        	current: null
        }
    }

    componentDidMount() {
        
    }	

    componentDidUpdate(prevProps, prevState) {
    	if(prevProps.user !== this.props.user) {
    		let items = this.getTechItems(this.props.type);
		    this.setState({
		      	items: items
		    });
    	}
    }

    getTechItems(type) {
		let techitems = [];
		if(this.props.user && this.props.user.techitems) {
			this.props.user.techitems.forEach((obj, i) => {
				if(obj.radarType === type) {
					techitems.push(obj);
				}
			});
			return techitems;
		}
		return techitems;
	}

	lightbox(e) {
		e.stopPropagation();
		let id = e.target.getAttribute('data-index'),
			obj = this.state.items[id];

		console.log(obj);
		this.setState({
			current: obj
		});
	}
    
    closeLightbox() {
    	this.setState({
    		current: null
    	});
    }

    deleteItem(e) {
    	let conf = confirm('Delete this?');
    	if(conf) {
    	let id = e.target.parentNode.getAttribute('data-id');
    		this.props.dispatch(deleteFromRadar(id));
    	}
    }

    render() {
    	let lightbox = "";
    	if(this.state.current) {
    		lightbox = (<div className="lightbox">
    						<div className="close ion-close" onClick={this.closeLightbox.bind(this)}></div>
    						<div className="title">{this.state.current.name}</div>
    						<div>
    							<p>{this.state.current.description}</p>
    						</div>
    					</div>
    				);
    	}
        return (<div className="techItems">
	        		<div className="title">{this.props.type}</div>
	        		{this.state.items.map((obj, i) => {
						return(
							<div key={i} className="techitem" data-id={obj._id} data-index={i} onClick={this.lightbox.bind(this)}>
								{obj.name}
								<div className="close ion-close" onClick={this.deleteItem.bind(this)}></div>
							</div>
						)
					})}
					{lightbox}
        	</div>
        );
    }

}
TechitemComponent = connect()(TechitemComponent);
export default TechitemComponent;
