import React from 'react';
import Router, { withRouter } from 'next/router';

class PrivatePage extends React.Component {
	static async getInitialProps({ req, res }) {
		if (req && !req.user) {
			console.error('PrivatePage:: INIT:', req.user);
			res.redirect('/auth');
		}

		//Redirect to Admin Page
		// if (req && req.user) {
		// 	if(req.user.admin == true){
		// 		res.redirect('/admin');
		// 	}
		// }
	}

	async componentDidMount() {
		// console.warn('PrivatePage::DID_M', this.props);
		const { session  } = this.props;
		if (!session.user) {
			// Router.push('/auth');
		}
	}
	componentDidUpdate() {
		// console.warn('PrivatePage::DID_U', this.props);
		const { session  } = this.props;
		if (!session.user) {
			// Router.push('/auth');
		}
	}
}

export default PrivatePage;
