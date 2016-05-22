import React from 'react';
import { connect } from 'react-redux';
import { registerUser, signIn } from '../actions/actions';

class SigninComponent extends React.Component {

	constructor (props) {
		super(props);
	}

	register (e) {
		let form 		= e.target.parentNode.parentNode.parentNode,
		data = {};
		data['email'] 	 	 	= form.querySelector('[name="register_email"]').value;
		data['emailConfirm'] 	= form.querySelector('[name="register_email_confirm"]').value;
		data['password'] 	 	= form.querySelector('[name="register_password"]').value;

		if(data.email !== data.emailConfirm) {
			form.querySelector('[name="register_email"]').style.border = "2px solid red";
			form.querySelector('[name="register_email_confirm"]').style.border = "2px solid red";
		} else {
			form.querySelector('[name="register_email"]').style.border = "";
			form.querySelector('[name="register_email_confirm"]').style.border = "";
		
			this.props.dispatch(registerUser(data));
		}
	}

	signIn (e) {
		e.preventDefault();
		let form = e.target.parentNode.parentNode.parentNode,
		data = {};
		data['email'] = form.querySelector('[name="signin_email"]').value;
		data['password'] = form.querySelector('[name="signin_password"]').value;

		this.props.dispatch(signIn(data));
	}

	render () {
		return (
			<div className="signin">
				<div className="row">
					<div className="medium-2 columns">
						&nbsp;
					</div>
					<div className="medium-8 columns">
						<h1>TechRaydr</h1>
					</div>
					<div className="medium-2 columns">
						&nbsp;
					</div>
				</div>
				<div className="row">
					<div className="medium-2 columns">
						&nbsp;
					</div>
					<div className="medium-3 columns">
						<form>
							<div className="title">
								Sign in
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="text" name="signin_email" placeholder="E-mail" />
								</div>
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="password" name="signin_password" placeholder="Password" />
								</div>
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="submit" value="Sign in" className="button" onClick={this.signIn.bind(this)} />
								</div>
							</div>
						</form>
					</div>
					<div className="medium-2 columns">
						&nbsp;
					</div>
					<div className="medium-3 columns">
						<form>
							<div className="title">
								Register
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="text" name="register_email" placeholder="E-mail" />
								</div>
								<div className="medium-12 columns">
									<input type="text" name="register_email_confirm" placeholder="Retype e-mail" />
								</div>
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="password" name="register_password" placeholder="Password" />
								</div>
							</div>
							<div className="row">
								<div className="medium-12 columns">
									<input type="submit" value="Register" className="button" onClick={this.register.bind(this)} />
								</div>
							</div>
						</form>
					</div>
					<div className="medium-2 columns">
						&nbsp;
					</div>
				</div>
			</div>
		)
	}
}

SigninComponent = connect()(SigninComponent);
export default SigninComponent;