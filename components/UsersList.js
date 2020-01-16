import React from 'react';

const UsersList = props => {
	const { title, records } = props;
	 // console.warn("UsersList",props );

	const recordsList = () => {

		return records.map((item, i) => {
			const userImg =  "/images/avatar-no-image.png";

			return (
				<li key={i} className="collection-item row valign-wrapper ">
					<div className="col s1">
						<img className="responsive-img circle " src={userImg} style={{ maxHeight: '35px', border: '1px solid #95bbde' }} />
					</div>
					 <div className="col s5">{item.name}</div>
					<div className="user-list-email col s5">{item.email}</div>
				</li>
			);
		});
	};


	return (
		<div className="row">
			<h4 className="">{title}</h4>

			{(!records || records.length <= 0) && (<div className="mcard center " >Записей нет</div>)}
			{records && records.length >0  && <ul className="collection user-list"  >{recordsList()}</ul>}
		</div>
	);
};
export default UsersList;
