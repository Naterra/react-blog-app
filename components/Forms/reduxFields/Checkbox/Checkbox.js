import * as React from 'react';


const Checkbox = (props) => {
    const { isRequired, label,   input,  meta: { touched, error, warning } } = props;
    const checked = input.value == true ? "checked" : "";
    let counter = 1;

    return ( <div className="input-field">
            <div className={isRequired ? 'input-checkbox-required' : 'input-checkbox'}>

                {/* Errors */}
                {touched && (error || warning ) && (<div className="form-field-error">
                    {error && <span>{error}</span> }
                    {warning && <span>{warning}</span>}
                </div>)}


                <label>
                     <input {...input} onClick={props.onClick } type="checkbox" checked={ checked }  />
                     { label && (<span>{label}</span>)}
                </label>

            </div>
        </div>
    );
};

export default  Checkbox ;
