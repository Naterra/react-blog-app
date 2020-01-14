import React from 'react';



 const inputFieldTempl = ({ input, value, type, label, preLabel, placeholder, isRequired, disabled, meta: { touched, error, warning } }) => (
    <div className={`input-field ${isRequired ? 'required' : ''}`}>
		{preLabel && <span style={{ marginRight: '10px' }}>{preLabel || ''}</span>}

		<input {...input}   type={type} placeholder={placeholder || ''} disabled={disabled} autoComplete="off" />
		<label className="active" htmlFor={input.name}>
			{label || ''}
		</label>
		<div className="form-field-error">{touched && ((error && <span className="field-error">{error}</span>) || (warning && <span className="field-warn">{warning}</span>))}</div>
	</div>
);

export default inputFieldTempl;