import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.selectRef = React.createRef();
		this.instance = null;
	}
	componentDidMount() {
		const { id } = this.props;
		let elems = this.selectRef.current;
		this.instance = M.FormSelect.init(elems, {
			dropdownOptions: {
				coverTrigger: false
			}
		});
	}
	componentDidUpdate(prevProps, prevState) {
		const { id } = this.props;

		// Reinitialize
		// if (!this.instance) {
			let elems = this.selectRef.current;
			this.instance = M.FormSelect.init(elems, {
				dropdownOptions: {
					coverTrigger: false
				}
			});
		// }
	}

	render() {
		const { id, onChange, options, selected, disabled, defaultValue } = this.props;
		// console.error("Select:render", this);

		const isSelected = value => {
			if (selected && selected == value) {
				return 'selected';
			} else {
				return '';
			}
		};

		return (
			<div className="input-field select-block ">
				<select id={id} ref={this.selectRef} disabled={disabled}  onChange={e => onChange ? onChange(e.target.value, id) :false } value={ defaultValue || ''}>
					<option value="">---</option>
					{ options  && options.map((item, i)=>{
						return (<option key={i} value={item.value}>{item.name}</option>);
					})}
				</select>

				<label>{this.props.label}</label>
			</div>
		);
	}
}
