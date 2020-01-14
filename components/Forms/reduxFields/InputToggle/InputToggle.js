import * as React from "react";
import reactCssModules from "react-css-modules";

/**  CSS  **/
// import styles from "./InputToggle.module.css";

const InputToggle = props => {
  const { input, label, isRequired, meta: { touched, error, warning } } = props;
  const checked = input.value == true ? "checked" : "";

  return (
    <div styleName={isRequired ? "required" : ""}>
      <div styleName="form-field-error">{touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}</div>
      {label && <span>{label}</span>}
      <div styleName="input-checkbox-toggle">
        <label styleName="toggle">
          <input {...input} checked={checked} type="checkbox" />
          <span>Toggle</span>
        </label>
      </div>
    </div>
  );
};

export default reactCssModules(InputToggle, styles);
