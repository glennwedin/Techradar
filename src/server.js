import express from "express";
import React from "react";
import { match, RouterContext } from "react-router";
import { renderToString } from 'react-dom/server';
import mainroute from "./routes/routes";
import apiRoute from "./routes/api";
import path from "path";
import bodyParser from "body-parser";
import session from "client-sessions";

var app = express();

//Point to static files
app.use(express.static('public/'));
app.use(session({
  cookieName: 'sXtechCookie',
  secret: 'eu3j4-3f34f_34f34-gokg30',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRoute);

app.get('*', function (req, res) {
	let routes = mainroute();
	match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
			res.status(500).send(error.message)
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			res.status(200).send('<!DOCTYPE html>'+renderToString(<RouterContext {...renderProps} />));
		} else {
			res.status(404).send('Not found')
		}
	})
});

//Listen on port
app.listen(3000);