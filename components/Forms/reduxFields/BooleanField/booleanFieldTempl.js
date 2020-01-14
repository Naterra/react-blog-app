import React from "react";
import reactCssModules from 'react-css-modules';

import styles from './booleanFieldTempl.module.css';

export default reactCssModules(({ input, label, isRequired, toggle, counter,  meta: { touched, error, warning } }) => {

    counter += 1;

    return (

        <div className={isRequired ? 'input-password-required' : 'input-password'}>
            <label>{label}</label>

            <div style={{ marginBottom: "5px",color:"red" }}>
                {touched &&
                ((error && <span>{error}</span>) ||
                    (warning && <span>{warning}</span>))}
            </div>

            {toggle &&
            <div styleName="input-checkbox-toggle">
                <label styleName="toggle">
                    <input {...input} type="checkbox" />
                    <span>Toggle</span>
                </label>
            </div>
            }

            {!toggle &&
            <div styleName={isRequired ? 'input-checkbox-required' : 'input-checkbox'}>
                <input {...input} type="checkbox" id={'checkbox-' + counter} />
                { label ? <label htmlFor={'checkbox-' + counter} >{ label }</label> : null }
            </div>
            }
        </div>
    );
}, styles);
