import React from 'react';
import Router, { withRouter } from 'next/router';

class PrivatePage extends React.Component {
	static async getInitialProps({ req, res }) {
		if (req && !req.user) {
			res.redirect('/auth');
		}

		//Redirect to Admin Page
		if (req && req.user && req.user.admin == true) {
			res.redirect('/admin');
		}
	}
}

export default PrivatePage;
