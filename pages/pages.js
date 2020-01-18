import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withRouter } from 'next/router';

/**  Components  **/
import Layout from '../components/layouts/Layout';
import RecordsListWithPaging from '../components/RecordsListWithPaging';


/**  Actions  **/
import { getPage, getPages } from '../store/actions';

class PagesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			record: null
		};
	}

	componentDidMount() {
		const { router } = this.props;
		const pageId = router.query.id || false;
		if (pageId) {
			this.props
				.getPage(pageId)
				.then(res => {
					this.setState({ record: res });
				})
				.catch(err => {});
		}
	}

	render() {
		console.log('PAGE', this.props);
		const { router } = this.props;
		const { record } = this.state;
		const pageId = router.query.id || false;
		let meta = {};

		if (pageId && record) {
			meta = { title: record.title, description: '' };
		} else {
			meta = { title: 'Pages', description: '' };
		}

		return (
			<Layout meta={meta} container={true} fixedContainer={false} {...this.props}>
				{pageId &&
					record && (
						<div>
							<h1>{record.title}</h1>
							<div className="row description ckEditorContent" dangerouslySetInnerHTML={{ __html: record.description }} />
						</div>
					)}

				{!pageId && (
					<div className="row">
						<h1>Articles</h1>
						<RecordsListWithPaging ElComponent={PagePreview} queryParam={{}} getRecordsFn={this.props.getPages} />
					</div>
				)}
			</Layout>
		);
	}
}

const PagePreview = props => {
	const { data } = props;

	let desc = '';
	if(data.description){
		desc = data.description.replace(/<[^>]*>?/gm, '');
		desc = desc.replace('&nbsp', '');
		desc = desc.slice(0, 250);
	}
	const img = data.image || '/images/noImage.png';

	return (
		<div className="row card flat-card  horizontal" style={{maxHeight: '140px'}}>
			<div className='col s6 m4' style={{ margin: '-5px 0 -5px -5px', paddingLeft:"0px" }}>
				<div className="background-img" style={{backgroundImage:`url(${img})`, width: '100%', height: '100%', minHeight: '130px'}}></div>
			</div>
			<div className='col s6 m8'>
				<div className="card-title truncate">{data.title}</div>
				<div className="">{desc}</div>
			</div>
		</div>
	);
};

PagesPage = withRouter(PagesPage);
export default connect(null, { getPage, getPages })(PagesPage);
