import React from "react";

//TODO: test it
class Textarea extends React.Component{
    constructor(props) {
        super(props);
        this.textareaRef = React.createRef() ;
    }
    componentDidUpdate(){
        const el = this.textareaRef.current;
        M.textareaAutoResize(el);
    }
    render(){
       const { input, label, placeholder, isRequired, meta: { touched, error, warning } } = this.props;

        return (
            <div  className={` ${isRequired ? 'required' : ''} input-field  `}>
                <label className="active" style={{top: '-4px'}}>{label}</label>
                <textarea ref={this.textareaRef} className="materialize-textarea" {...input}  rows="10"  placeholder={placeholder || ''} />

                {touched && (error || warning) && (<div className="form-field-error">
                    {error && <span className="field-error">{error}</span>}
                    {warning && <span className="field-warn">{warning}</span>}
                </div>)}
            </div>
        );
    }
}

export default Textarea;