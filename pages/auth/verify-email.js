import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
const jwt = require('jsonwebtoken');
import { connect } from 'react-redux';
import Link from 'next/link';

/** Components**/
import Layout from '../../components/layouts/Layout';

/** Actions **/
import { verifyEmailAfterRegistration, verifyEmailWithToken } from '../../store/actions';

class VerifyEmail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			successMsg: null
		};
	}

	componentDidMount() {
		const { router } = this.props;

		const token = router.query.token;
		const email = router.query.email;

		// Верификация по приглашению
		if(token){
			this.props
				.verifyEmailWithToken(token)
				.then(res => {
					if (!res.data) {
						const err = res.response ? res.response.data.error : 'Неправильный запрос';
						// console.warn('THEN++', err);
						this.setState({ error: err });
					} else {
						// console.warn('THEN', res);
						this.setState({ successMsg: res.data.msg });
					}
				})
				.catch(err => {
					// console.warn('CATCH', err);
					this.setState({ error: err.error });
				});
		}

		//Верификация по регистрации через email
		if(email){

			this.props
				.verifyEmailAfterRegistration(email)
				.then(res => {
					if(res.data.success){
						if(res.data.newUser){
							this.props.router.push('/auth');
						}else{
							// console.warn('THEN', res);
							this.setState({ successMsg: res.data.msg });
						}
					}else{
						const err = res.response ? res.response.data.error : 'Неправильный запрос';
						// console.warn('THEN with error', err);
						this.setState({ error: err });
					}
				})
				.catch(err => {
					// console.warn('CATCH', err);
					this.setState({ error: err.error });
				});
		}
	}
	render() {
		const { error, successMsg } = this.state;
		// console.warn("rend", this);
		return (
			<Layout>
				<div className="row">
					<div className="col s12  center">
						{error && <p className="red-text">{error}</p>}

						{successMsg && (
							<Fragment>
								<h3>{successMsg}</h3>

								<p className="" style={{ marginTop: '6%' }}>
									<Link href="/auth">
										<a className="btn">Log In</a>
									</Link>
								</p>
							</Fragment>
						)}
					</div>
				</div>
			</Layout>
		);
	}
}

export default connect(null, { verifyEmailAfterRegistration, verifyEmailWithToken })(withRouter(VerifyEmail));
