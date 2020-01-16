import React, { Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';

/** Components **/
import DropdownMenu from './Materialize/DropdownMenu';

/** Actions **/
import { sighOut } from '../store/actions';

class UserMenu extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSignoutSubmit = async event => {
		event.preventDefault();
		this.props.sighOut();
		Router.push('/');
	};

	render() {
		const { session } = this.props;
		const userImg = session.user.image ? session.user.image : '/images/avatar-no-image.png';

		const triggerIcon = (
			<div className="nav-avatar-dropdown-trigger">
				<i className="material-icons">arrow_drop_down</i>
			</div>
		);

		if (session && session.user) {
			return (
				<div className="userMenu" style={{ display: 'flex', marginLeft: '25px' }}>
					<Link href="/account">
						<a className="dropdown-item">
							<img className="responsive-img circle " style={{ width: '30px', verticalAlign: 'middle' }} src={userImg} />
						</a>
					</Link>

					<DropdownMenu id="account" activeComponent={triggerIcon} icon="">
						<DropdownLinks handleSignoutSubmit={this.handleSignoutSubmit} />
					</DropdownMenu>
				</div>
			);
		} else {
			return false;
		}
	}
}

const DropdownLinks = props => {
	const { handleSignoutSubmit } = props;

	return (
		<Fragment>
			<li>
				<Link href="/admin">
					<a className="dropdown-item">
						<span className="icon ion-md-person mr-1" /> Admin Page
					</a>
				</Link>
			</li>

			<li className="divider" />
			<li>
				<form id="signout" method="post" action="/auth/signout" onSubmit={handleSignoutSubmit}>
					<button type="submit" className="">
						<span className="icon ion-md-log-out mr-1" />Log Out
					</button>
				</form>
			</li>
			<style jsx>{`
				a[type='submit'] {
					-webkit-appearance: none;
					line-height: 46px;
				}
				button[type='submit'] {
					border: none;
					line-height: 42px;
					width: 100%;
					padding: 0px 0 0 15px;
					text-align: left;
				}
			`}</style>
		</Fragment>
	);
};

export default connect(null, { sighOut })(UserMenu);
