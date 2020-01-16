import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import Router from 'next/router';

/**  Components **/
import Layout from './Layout';

class UserProfileLayout extends React.Component {
	static async getInitialProps({ req, res }) {

		//Redirect to Admin Page
		if (req && req.user) {
			if(req.user.admin == true){
				res.redirect('/admin');
			}
		}
	}

	componentDidMount() {
		const { session } = this.props;
		if (session.user && session.user.admin == true) {
			Router.push(this.props.redirectTo || '/admin');
		}
	}

	render() {
		return (
			<Layout {...this.props} container={false}>
				<div className="row flex">
					<div className="col s3 z-depth-1 user-sidebar">
						<LeftSidebarMenue {...this.props} />
					</div>
					<div className="col s9">{this.props.children}</div>
				</div>
			</Layout>
		);
	}
}

class LeftSidebarMenue extends React.Component {
	render() {
		return (
			<ul className="">
				<li>
					<Link href={`/account`}>
						<a>Home</a>
					</Link>
				</li>
			</ul>
		);
	}
}

export default withRouter(UserProfileLayout);
