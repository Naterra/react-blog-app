import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { withRouter } from 'next/router';
import ReactDOMServer from 'react-dom/server';

/**  Components  **/
import Layout from '../components/layouts/Layout';
import RecordsListWithPaging from '../components/RecordsListWithPaging';
import Breadcrumbs from '../components/Materialize/Breadcrumbs';

/**  Actions  **/
import { getPageById, getPages } from '../store/actions';

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
				.getPageById(pageId)
				.then(res => {
					this.setState({ record: res });
				})
				.catch(err => {});
		}
	}

	render() {
		const { router } = this.props;
		const { record } = this.state;
		const pageId = router.query.id || false;
		let meta = { title: 'Pages', description: '' };

		// Single Page
		if (pageId) return <PageView record={record} {...this.props} />;


		// List of Records
		return (
			<Layout meta={meta} container={true} fixedContainer={false} {...this.props}>
				{!pageId && (
					<div className="row">
						<h1>Articles</h1>
						<RecordsListWithPaging ElComponent={PagePreview} limit={10} queryParam={false} getRecordsFn={this.props.getPages} />
					</div>
				)}
			</Layout>
		);
	}
}


const PageView = props => {
	const { record } = props;
	if (!record) return false;

	const meta = { title: record.title, description: '' };
	const img = record ? ReactDOMServer.renderToString(<img src={record.image} style={{ width: '315px', float: 'left', margin: '5px 10px 10px 0' }} />) : '';
	const content = record ? `${img} ${record.description}` : '';
	const bk =[{link:'/pages', title:'Articles'}];

	return (
		<Layout meta={meta} container={true} fixedContainer={false} {...props}>
		 <Breadcrumbs links={bk}/>
				<h1>{record.title}</h1>
				<div className="row description ckEditorContent" dangerouslySetInnerHTML={{ __html: content }} />

		</Layout>
	);
};

const PagePreview = props => {
	const { data } = props;

	let desc = '';
	if (data.description) {
		desc = data.description.replace(/<[^>]*>?/gm, '');
		desc = desc.replace('&nbsp', '');
		desc = desc.slice(0, 250);
	}
	const img = data.image || '/images/noImage.png';

	return (
		<div className="row card flat-card  horizontal" style={{ maxHeight: '140px' }}>
			<Link href={`/pages/${data.id}`}>
				<a>
					<div className="col s6 m4" style={{ margin: '-5px 0 -5px -5px', paddingLeft: '0px' }}>
						<div className="background-img" style={{ backgroundImage: `url(${img})`, width: '100%', height: '100%', minHeight: '130px' }} />
					</div>
					<div className="col s6 m8">
						<div className="card-title truncate">{data.title}</div>
						<div className="" style={{ color: '#313131' }}>
							{desc}
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
};

PagesPage = withRouter(PagesPage);
export default connect(null, { getPageById, getPages })(PagesPage);
