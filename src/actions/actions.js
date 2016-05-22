export const REQUEST_REPOS = 'REQUEST_REPOS'
function requestRepos(repos) {
  return {
	type: REQUEST_REPOS,
	repos
  }
}

export const RECEIVE_REPOS = 'RECEIVE_REPOS'
function receiveRepos(repos, json) {
  return {
	type: RECEIVE_REPOS,
	repos,
	posts: json,
	receivedAt: Date.now()
  }
}

export function fetchPosts(obj) {
	return function (dispatch) {
		dispatch(requestRepos(obj)) //Request

		return fetch('https://api.github.com/search/repositories?q='+obj.query+'+language:'+obj.language+'&sort=stars&order=desc')
			.then(response => response.json())
			.then(json => dispatch(receiveRepos(obj, json))
		).catch(err => {
			console.log(err)
		});
	}
}

export const RECEIVE_RADAR = 'RECEIVE_RADAR'
function receiveRadar(json) {
  return {
	type: RECEIVE_RADAR,
	json,
	receivedAt: Date.now()
  }
}

export const FETCH_RADAR = 'FETCH_RADAR'
function fetchRadar(radarType, json) {
  return {
	type: FETCH_RADAR,
	radarType,
	json
  }
}

export function addToRadar(radarType, obj) {
	return function (dispatch) { 
		dispatch(fetchRadar(radarType, obj));

		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/radar');
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText)));
			}
		}
		
		let data = 'repoName='+obj.name+'&radarType='+radarType+'&description='+obj.description;
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send(data);
	}
}

export function getUserRadar(id) {
	return function (dispatch) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/radar/'+id);
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText))); //receiveUserRadar?
			}
		}
		let data = 'id='+id;
		xhr.send(data);
	} 
}

export function deleteFromRadar(id) {
	return function (dispatch) {
		let xhr = new XMLHttpRequest();
		xhr.open('DELETE', '/api/radar/'+id);
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText)));
			}
		}
		
		let data = 'id='+id;
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		xhr.send(data);
	} 
}

/// REGISTER

export const RECEIVE_USER = 'RECEIVE_USER';
function receiveUser(user) {
	return {
		type: RECEIVE_USER,
		user,
		receivedAt: Date.now()
	}
}

export function registerUser(data) {
	return function (dispatch) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/register');
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText)));
			}
		}
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		let d = 'email='+data.email+'&password='+data.password;
		xhr.send(d);
	} 
}

///SIGN IN
export function signIn(data) {
	return function (dispatch) {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/signin');
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText)));
			}
		}
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		let d = 'email='+data.email+'&password='+data.password;
		xhr.send(d);
	} 
}

///VALIDATE
export function validateUser() {
	return function (dispatch) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/validateuser');
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				dispatch(receiveUser(JSON.parse(xhr.responseText)));
			}
		}
		xhr.send();
	} 
}