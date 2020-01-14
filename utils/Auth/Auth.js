import fetch from 'isomorphic-fetch';

export default class {
	static async init({ req = null, force = false } = {}) {
		let session = {};
		if (req) {
			// console.log('s::req', req);
			if (req.session) {
				// If running on the server session data should be in the req object
				session.expires = req.session.cookie._expires;
				// If the user is logged in, add the user to the session object
				if (req.user) {
					session.user = req.user;
				}
			}
		} else {
			// console.log('s::no req');
			// If running in the browser attempt to load session from sessionStore
			if (force === true) {
				// If force update is set, reset data store
				this._removeLocalStore('session');
			} else {
				session = this._getLocalStore('session');
			}
		}

		// If session data exists, has not expired AND force is not set then
		// return the stored session we already have.
		if (session && Object.keys(session).length > 0 && session.expires && session.expires > Date.now()) {
			return new Promise(resolve => {
				resolve(session);
			});
		} else {
			// If running on server, but session has expired return empty object
			// (no valid session)
			if (typeof window === 'undefined') {
				return new Promise(resolve => {
					resolve({});
				});
			}
		}

		// If we don't have session data, or it's expired, or force is set
		// to true then revalidate it by fetching it again from the server.
		return fetch('/api/auth/session', {
			credentials: 'same-origin'
		})
			.then(response => {
				if (response.ok) {
					return response;
				} else {
					return Promise.reject(Error('HTTP error when trying to get session'));
				}
			})
			.then(response => response.json())
			.then(data => {
				// Update session with session info
				session = data;

				// Set a value we will use to check this client should silently
				// revalidate, using the value for revalidateAge returned by the server.
				session.expires = Date.now() + session.revalidateAge;

				// Save changes to session
				this._saveLocalStore('session', session);

				return session;
			})
			.catch(() => Error('Unable to get session'));
	}

	// The Web Storage API is widely supported, but not always available (e.g.
	// it can be restricted in private browsing mode, triggering an exception).
	// We handle that silently by just returning null here.
	static _getLocalStore(name) {
		try {
			return JSON.parse(localStorage.getItem(name));
		} catch (err) {
			return null;
		}
	}

	static _saveLocalStore(name, data) {
		try {
			localStorage.setItem(name, JSON.stringify(data));
			return true;
		} catch (err) {
			return false;
		}
	}

	static _removeLocalStore(name) {
		try {
			localStorage.removeItem(name);
			return true;
		} catch (err) {
			return false;
		}
	}


}
