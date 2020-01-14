import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/** Components **/
import PrivatePage from '../../components/PrivatePage';
import UserProfileLayout from '../../components/layouts/UserProfileLayout';

/** Actions **/
import { getUserData } from '../../store/actions';



class AccountPage extends PrivatePage {
	render() {
		const {} = this.props;
		return (<UserProfileLayout container={true} {...this.props}>
				Hello
		</UserProfileLayout>
		);
	}
}





AccountPage = connect(null, {  getUserData })(AccountPage);
export default  AccountPage ;
