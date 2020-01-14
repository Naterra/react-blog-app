import React, { Fragment } from 'react';
import Paging from './Paging';
import PreloaderSpinner from './Materialize/PreloaderSpinner';

/**
 * A list of records with paging
 * @param ElComponent - react component for rendering list item element
 * @param getRecordsFn - FN to fetch records
 * @param queryParam - Query {} for DB ex: {location:{state, city},  sort:"photos_local"}
 * @param asTable - true/false - will render as a table View.
 * @param tableHeader - if asTable==true. ex: ['title','City']
 *
 */
class RecordsListWithPaging extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			page: 1,
			limit: 20,
			loading: false
		};
		this.getRecords = this.getRecords.bind(this);
		this.pageChanged = this.pageChanged.bind(this);
	}
	componentDidMount() {
		this.getRecords();
	}
	componentDidUpdate(prevProps, prevState) {
		const { page, limit } = this.state;
		// console.error("componentDidUpdate", {prevState, state:this.state});
		if (prevState.page !== page) {
			this.getRecords();
		}
	}
	getRecords() {
		// console.log('getRecords');
		const { getRecordsFn, queryParam } = this.props;
		const { page, limit } = this.state;
		let query = { limit, page: page - 1 };
		if (queryParam) {
			query = Object.assign({}, query, queryParam);
		}
		getRecordsFn(query)
			.then(res => {
				this.setState({ records: res });
			})
			.catch(err => {})
			.finally(() => {
				this.setState({ loading: false });
			});
	}
	pageChanged(e, page) {
		// this.props.pageChangedCallback(page);
		// console.error("pageChanged", page);
		this.setState({ page });
	}
	render() {
		const { ElComponent,  asTable = false, tableHeader } = this.props;
		const { records, limit,  loading } = this.state;
		const total = 0;
		// console.log("RecordsListWithPaging", this);

		// Table View
		if (asTable) {
			return (
				<div>
					<table className="striped highlight">
						<thead>
							<tr>{tableHeader && tableHeader.map((item, i) => <th key={i}>{item}</th>)}</tr>
						</thead>
						<tbody>
							{records.items && records.items.map((item, i) => {
									return <ElComponent key={i} data={item} />;
								})}
						</tbody>
					</table>
					{records.total >=limit && (<Paging onClick={this.pageChanged} total={records.total} recordsPerPage={this.state.limit} pageNo={this.state.page} />)}
				</div>
			);
		} else {
			// Regular View
			return (
				<Fragment>
					{loading && <PreloaderSpinner extraStyles={{ margin: '100px 45%' }} />}
					{ records.items && records.items.map((item, i) => {
							return <ElComponent key={i} data={item} />;
						})}

					{records.total >=limit && (<Paging onClick={this.pageChanged} total={records.total} recordsPerPage={this.state.limit} pageNo={this.state.page} />)}
				</Fragment>
			);
		}
	}
}

export default RecordsListWithPaging;
