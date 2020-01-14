import React, { Component, Fragment } from 'react';

class ShowMoreText extends Component {
	constructor(props) {
		super(props);

		this.contentRef = React.createRef();
		this.helperRef = React.createRef();
		this.initialHeight = '53px';
		this.height = '53px';
		this.status = 'closed';

		this.toggleView = this.toggleView.bind(this);
	}
	toggleView() {
		// console.log('toggleView', this.state);

		const newStatus = this.status == 'closed' ? 'open' : 'closed';
		this.status = newStatus;

		let contentEl = this.contentRef.current;
		let helperEl = this.helperRef.current;
		let sectionHeight = contentEl.scrollHeight;

		contentEl.classList.toggle('open');

		if (newStatus == 'closed') {
			contentEl.style.height = this.initialHeight;
			helperEl.innerHTML = 'Показать весь текст';
		} else {
			contentEl.style.height = sectionHeight + 'px';
			helperEl.innerHTML = 'Скрыть';
		}
	}
	render() {
		const { text } = this.props;


		return (
			<div className="show-more-text col s12">
				<div ref={this.contentRef} className={`content`} style={{ height: this.height }}>
					<div dangerouslySetInnerHTML={{ __html: text }} />
				</div>
				<div ref={this.helperRef} className="helper right blue-text" onClick={this.toggleView}>
					Показать весь текст
				</div>
			</div>
		);
	}
}

export default ShowMoreText;
