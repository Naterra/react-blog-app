import React from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import $ from 'jquery';
import packageJson from '../../package.json';

/**  Components  **/
import Styles from '../../css/index.scss';
import TopNavbar from '../TopNavbar';
import Footer from '../Footer';

if (typeof window !== 'undefined') {
	window.$ = $;
	window.jQuery = $;
	require('materialize-css');
}

class Layout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { pageClass = '', fixedContainer, meta, router } = this.props;

		return (
			<React.Fragment>
				<Head>
					<title>{meta && meta.title ? meta.title : packageJson.name}</title>
					<meta name="description" content={meta && meta.description ? meta.description : ''} />
					<meta name="keywords" content={meta && meta.keywords ? meta.keywords : ''} />

					<meta property="og:title" content={meta && meta.title ? meta.title : packageJson.name} />
					<meta property="og:description" content={meta && meta.description ? meta.description : ''} />
					<meta property="og:site_name" content={packageJson.name} />
					<meta property="og:url" content={`${process.env.SITE_HOST}${router.asPath == '/' ? '' : router.asPath}`} />
					<meta property="og:image" content={meta && meta.image ? `${process.env.SITE_HOST}/${meta.image}` : ''} />
					<meta property="og:image:width" content="550" />
					<meta property="og:image:height" content="309" />

					<style dangerouslySetInnerHTML={{ __html: Styles }} />
				</Head>
				<TopNavbar {...this.props} />

				<MainBody fixedContainer={fixedContainer} pageClass={pageClass} container={this.props.container}>
					{this.props.children}
				</MainBody>

				<Footer />
			</React.Fragment>
		);
	}
}

export class MainBody extends React.Component {
	render() {
		const { container=false, fixedContainer=false, pageClass } = this.props;

		const containerClass = container ? 'container':'';
		const fixedCClass = fixedContainer && !container ? 'fixed_container':'';

		return (
			<main className={`${pageClass}`}>
				<div className={`${containerClass} ${fixedCClass} `}>{this.props.children}</div>
			</main>
		);
	}
}

export default withRouter(Layout);
