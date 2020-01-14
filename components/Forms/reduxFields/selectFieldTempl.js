import React, { Component } from 'react';

 class SelectField extends Component{
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
		let elems = this.selectRef.current;

		// Reinitialize
		if (!this.instance || prevProps.children !== this.props.children || prevProps.defaultValue !== this.props.defaultValue) {
			this.instance = M.FormSelect.init(elems, {
				dropdownOptions: {
					coverTrigger: false
				}
			});
		}
	}
	handleChange(e) {
		const { input, onChange} = this.props;

		// update store via redux-form
		input.onChange(e);

		// send the selected value back to the component
		if (onChange) onChange(e.target.value);
	}

	render() {
		const { id, input, children, message, disabled, isRequired, meta: { touched, error, warning } } = this.props;

		return (
			<div className={`input-field  ${isRequired ? 'required' : ''}`}>
				{message && (
					<div className="form-field-message">
						<span>{message}</span>
					</div>
				)}

				<select id={id} ref={this.selectRef} disabled={disabled} {...input} onChange={e => this.handleChange(e)}>
					{children}
				</select>
				<label className="active">{this.props.label}</label>
				<div className="form-field-error">{touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warn">{warning}</span>))}</div>
			</div>
		);
	}
}

export default SelectField;