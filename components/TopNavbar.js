import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  packageJson from '../package.json';

/** Components **/
import UserMenu from './UserMenu';
import Link from 'next/link';
import DropdownMenu from './Materialize/DropdownMenu';

/** Actions **/
import { getPages } from '../store/actions';

class TopNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			links: null
		};
	}
	componentDidMount() {
		this.props
			.getPages()
			.then(res => {
				let records = res.items.filter(item => item.showOnMenu == true);
				const links = records.map(item => {
					return {
						title: item.title,
						url: `/pages/${item._id}`
					};
				});
				this.setState({ links });
			})
			.catch(err => {});
	}

	render() {
		const { session } = this.props;
		const { links } = this.state;

		return (
			<nav className={`top-navbar`}>
				<div className="nav-wrapper  container">
					<Logo />

					{/* User Menu */}
					{session &&
						session.user && (
							<div className="user-menu-div right">
								<UserMenu {...this.props} />
							</div>
						)}

					{/* Large Screens Only */}
					<ul id="nav-mobile" className="navbar-links right hide-on-med-and-down">
						<MenuLinks links={links} />
					</ul>

					{/* Small Screens Only */}
					<div className="right show-on-medium-and-down">
						<DropdownMenu id="menu" activeComponent={triggerIcon} icon="">
							<MenuLinks links={links} />
						</DropdownMenu>
					</div>
				</div>
			</nav>
		);
	}
}

const MenuLinks = props => {
	const { links } = props;

	// if not loaded yet
	if (links == null) return false;

	return (
		<Fragment>
			{links && links.map((item, idx) => {
					return (<li key={idx}>
							<Link href={item.url}>
								<a>{item.title}</a>
							</Link>
						</li>);
				})}
			<li>
				<Link href="/pages"><a>Posts</a></Link>
			</li>
			<li>
				<Link href="/contacts"><a>Contacts</a></Link>
			</li>
		</Fragment>
	);
};

const triggerIcon = (
	<div className="nav-avatar-dropdown-trigger">
		<i className="material-icons">dehaze</i>
	</div>
);

const Logo = () => {
	return (
		<Link href="/">
			<a className="brand-logo left">
				<img src={'/logo.svg'}/>
				<span>{packageJson.name}</span>
			</a>
		</Link>
	);
};

export default connect(null, { getPages })(TopNavbar);
