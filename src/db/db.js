import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

mongoose.connect('mongodb://localhost/techradar');

let Schema = mongoose.Schema;

let User = mongoose.model('User', { email: { type: String, unique: true }, password: String, techitems: Array });
let Techitem = mongoose.model('Techitem', { name: String, radarType: String, description: String });


let getUser = (id) => {
	return new Promise((resolve, reject) => {
		User.findOne({ _id: id }, {email: 1, techitems: 1}, (err, res) => {
			if(err) reject(err);

			resolve(res);
		});
	});
}

let methods = {
	createUser: (email, password) => {
		return new Promise((resolve) => {
			let u = new User({email: email, password: bcrypt.hashSync(password)});
			u.save((err, p) => {
				resolve({_id: u.id, email: u.email});
			});
		});
	},

	signInUser: (email, password) => {
		return new Promise((resolve, reject) => {
			User.findOne({email: email}, {email: 1, password: 1}, (err, res) => {
				if(err) {
					reject(err);
				}
				if(res && bcrypt.compareSync(password, res.password)) {
					getUser(res._id).then((user) => {
						resolve(user);
					});
				} else {
					resolve(null);
				}
			})
		});
	},

	getUser: (id) => {
		return new Promise((resolve) => {
			getUser(id).then((user) => {
				resolve(user);
			});
		});
	},

	getUserRader: (id) => {
		return new Promise((resolve) => {
			getUser(id).then((user) => {
				user.email = null;
				resolve(user);
			});
		});
	},

	addItem: (id, techitem) => {
		return new Promise((resolve, reject) => {
			let ti = new Techitem(techitem)

			User.update({_id: id}, {$push: { techitems: ti }}, function (err) {
				if(err) reject(err);
				getUser(id).then((user) => {
					resolve(user);
				});
			});
		});
	},

	removeItem: (userid, itemid) => {
		console.log(userid, mongoose.Types.ObjectId(itemid));
		return new Promise((resolve, reject) => {

			User.update({_id: userid}, { $pull: { techitems : { _id: mongoose.Types.ObjectId(itemid) } } }, function (err, data) {
				if(err) reject(err);
				getUser(userid).then((user) => {
					resolve(user);
				});
			});
		});
	}
}

export default methods;