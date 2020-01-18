import React, { Fragment } from 'react';
import Layout from './Layout';
import UserAvatarBlock from '../admin/UserAvatarBlock';
import Link from 'next/link';

export default class AdminPageLayout extends React.Component {
	render() {
		return (
			<Layout pageClass={'adminPage'} {...this.props} container={false}>
				<LeftSidebar {...this.props} />

				<div className="col s9 m9 l10">{this.props.children}</div>
			</Layout>
		);
	}
}


class LeftSidebar extends React.Component {
	render() {
		return (
			<div className="col s3 m3 l2 admin-left-sidebar">
				<UserAvatarBlock {...this.props} />
				<ul className="adminMenu">
					<li>
						<Link href="/admin">
							<a>
								<i className="material-icons">dashboard</i>
								<span className="title">Dashboard</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="/admin/pages">
							<a>
								<i className="material-icons">chevron_right</i>
								<span className="title">Pages</span>
							</a>
						</Link>
					</li>
					<li>
						<Link href="/admin/settings">
							<a>
								<i className="material-icons">chevron_right</i>
								<span className="title">Settings</span>
							</a>
						</Link>
					</li>
				</ul>

				<style jsx>{`
					.adminMenu li span {
						margin-left: 10px;
					}
					.adminMenu li {
						padding: 10px;
					}
				`}</style>
			</div>
		);
	}
}
