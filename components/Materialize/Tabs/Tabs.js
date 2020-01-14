import React, { Component } from 'react';

/**
 * id - instance ID
 * extraClass - (str) additional class of component. Use for styling
 */
class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.tabRef = React.createRef();
		this.tabsInstance =null;

		this.getMenuList = this.getMenuList.bind(this);
	}

	componentDidMount() {
		const tabsEl = this.tabRef.current;
		this.tabsInstance =  M.Tabs.init(tabsEl, {});
	}


	getMenuList(){
		const { id, menuList, tabChangedCallback } = this.props;

		return menuList.map((item, i) => {
			return (
				<li key={i} className="tab" onClick={tabChangedCallback}>
					<a id={i} className={i === 0 ? 'active' : ''} href={`#tab-${id}-${i + 1}`}>
						{item}
					</a>
				</li>
			);
		});
	}

	render() {
		const { id, children, extraClass } = this.props;

		return (
			<div  className={`row tabs-${id} ${extraClass} `}>
				<div className={`col s12 tab-menu`}>
					<ul id={id} ref={this.tabRef} className="tabs tabs-fixed-width">
						{this.getMenuList()}
					</ul>
				</div>
				{children}
			</div>
		);
	}
}

export default  Tabs;
