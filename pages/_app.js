import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';

import Auth from '../utils/Auth/Auth';
import withRedux from 'next-redux-wrapper';

/**  Store  **/
import reduxStore, { makeStore } from '../store/reducer';

class MyApp extends App {
	static async getInitialProps({ req, Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return {
			session: await Auth.init({ req: ctx.req }),
			pageProps: pageProps
		};
	}

	render() {
		const { Component, pageProps, session } = this.props;
		return (
			<Provider store={reduxStore}>
				<Component session={session} {...pageProps} />
			</Provider>
		);
	}
}

export default withRedux(makeStore)(MyApp);
