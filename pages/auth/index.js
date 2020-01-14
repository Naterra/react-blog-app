import React, { Component } from 'react';
import { withRouter } from 'next/router';

/** Components **/
import Layout from '../../components/layouts/Layout';
import SignInUpForm from '../../components/Forms/SignInUpForm';


class AuthPage extends Component {
	static async getInitialProps({ req, res }) {
		// If session exist, redirect to account
		if (req && req.user) {
			res.redirect('/account');
		}
	}
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { session, router } = this.props;
		if (session.user) {
			router.push('/account');
		}
	}

	componentDidUpdate() {
		const { session , router } = this.props;
		if (session.user) {
			router.push('/account');
		}
	}

	render() {
		return (
			<Layout container={true} {...this.props} navmenu={false} signinBtn={false}>
				<SignInUpForm {...this.props}/>
			</Layout>
		);
	}
}


export default withRouter(AuthPage);
