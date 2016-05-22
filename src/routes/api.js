import express from "express";
import db from "../db/db";

let router = express.Router();

let validateUser = function (req) {
	return new Promise ((resolve) => {
		if(req.sXtechCookie && req.sXtechCookie.user) {
			db.getUser(req.sXtechCookie.user._id).then((user) => {
				resolve(user);
			});
		} else {
			resolve(null);
		}
	});
}

router.post('/radar', (req, res) => {
	let u = validateUser(req);

	u.then((user) => {
		if(user) {
			let repoName    = req.body.repoName,
				radarType   = req.body.radarType,
				description = req.body.description; 

			db.addItem(user._id, {
					name: repoName, 
					radarType: radarType, 
					description: description
				}).then((data) => {
				res.json(data);
			});
		} else {
			res.json(null);
		}
	})
});

router.get('/radar/:id', (req, res) => {
	let id = req.params.id;

	db.getUserRader(id).then(radar => {
		res.json(radar);
	});	
});

router.delete('/radar/:id', (req, res) => {
	let u = validateUser(req);
	u.then((user) => {
		if(user) {
			db.removeItem(user.id, req.params.id).then((data) => {
				res.json(data);
			});
		} else {
			res.json(null);
		}
	});
});

router.post('/register', (req, res) => {
	let email = req.body.email,
		password = req.body.password;
	
	db.createUser(email, password).then((user) => {
		if(user._id) {
			req.sXtechCookie.user = user;
			res.json(user);
		}
		res.json(null);
	});
});

router.get('/validateuser', (req, res) => {
	let u = validateUser(req);
	console.log('validateuser', u)
	u.then((user) => {
		if(user) {
			res.json(user);
		}
		res.json(null);
	});
	
});

router.post('/signin', (req, res) => {
	let email = req.body.email,
		password = req.body.password;
	//Get user by username
	db.signInUser(email, password).then((user) => {
		if(user) {
			req.sXtechCookie.user = user;
			res.json(user);
		}
		res.json(null);
	});
});

export default router;