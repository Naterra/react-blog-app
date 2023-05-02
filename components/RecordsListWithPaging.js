import React, { Fragment, useState, useEffect } from 'react';
import Paging from './Paging';
import PreloaderSpinner from './Materialize/PreloaderSpinner';

/**
 * @initialRecords - []; for SSR, we should have some data to render first page
 */

const RecordsListWithPaging = props => {
	const { initialRecords, ElComponent, getRecordsFn, queryParam, asTable = false, tableHeader } = props;

    const [didMount, setDidMount] = useState(false);
	const [page, setPage] = useState(0);
	const [records, setRecords] = useState(initialRecords.places.length > 0 ? initialRecords : []);
	const [loading, setLoading] = useState(false);
	let limit = props.limit ? props.limit : 20;
    // console.log('++++++++++++ RECORDS_LIST  ++++++++++++', { page, records, limit });

	const pageChanged = (e, value) => {
		setPage(value);
	};

	const getRecords = () => {
        // console.log('>>getRecords');
		let query = { limit, page };
		if (queryParam) query = Object.assign({}, query, queryParam);

		// setLoading(true);
		getRecordsFn(query)
			.then(res => {
				setRecords(res);
			})
			.catch(err => {})
			.finally(() => {
				// setLoading(false);
			});
	};

	// Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
            // console.log('>> useEffect', { page, records, limit });
            if(!didMount){
                setDidMount(true);
            }else{
                getRecords();
            }
		},
		[page]
	); // Only re-run the effect if pageNo changes


	return (
		<div>
			{asTable ? (
				<div>
					<table className="striped highlight">
						<thead>
							<tr>{tableHeader && tableHeader.map((item, i) => <th key={i}>{item}</th>)}</tr>
						</thead>
						<tbody>
							{records.places &&
                            records.places.map((item, i) => {
									return <ElComponent key={i} data={item} />;
								})}
						</tbody>
					</table>
				</div>
			) : (
				<Fragment>
					{loading && <PreloaderSpinner extraStyles={{ margin: '100px 45%' }} />}
					{records.places &&
                    records.places.map((item, i) => {
							return <ElComponent key={i} data={item} />;
						})}
				</Fragment>
			)}

			<Paging onClick={pageChanged} total={records.total} recordsPerPage={limit} pageNo={page} />
		</div>
	);
};

export default RecordsListWithPaging;
