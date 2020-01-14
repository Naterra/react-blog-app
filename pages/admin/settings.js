import React from 'react';
import { connect } from 'react-redux';

/** Components **/
import PrivatePage from '../../components/PrivatePage';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import MailingSettings from '../../components/Forms/MailingSettingsForm';
import Tabs from '../../components/Materialize/Tabs/Tabs';

/**  Actions  **/
import { addSettings } from '../../store/actions';

class SettingsPage extends PrivatePage {
	constructor(props) {
		super(props);
		this.state = {};
	}


	tabChanged=()=>{};

	render() {
		// const {  loading } = this.state;
		const tabId='admin';

		return (
			<AdminPageLayout {...this.props} container={false}>
				<h1>Settings</h1>

				<Tabs id={tabId} menuList={['Main', 'Other']}	tabChangedCallback={this.tabChanged} >
					<div id={`tab-${tabId}-1`}  className="col s12">
						<MainSettings />
					</div>

					<div id={`tab-${tabId}-2`}  className="col s12">
						{/*<MailingSettings {...this.props} />*/}
					</div>
				</Tabs>


			</AdminPageLayout>
		);
	}
}


const MainSettings = ()=>{
	return (<blockquote style={{ borderLeft: '5px solid #00BCD4'}}>
		1. Check your sitemap.xml <a target="_blank" href="/sitemap.xml">Here</a><br/>
		2. Check your robots.txt <a target="_blank" href="/robots.txt">Here</a>
	</blockquote>);
};



export default connect(null, { addSettings })(SettingsPage);
