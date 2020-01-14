import React from 'react';


export default class extends React.Component{

    componentDidUpdate(prevProps, prevState) {
        M.updateTextFields();
    }

    render(){
        const { id='', label="", value='', placeholder, onChange } = this.props;

        return(<div className="input-field">
            <input id={id} status="active"  placeholder={placeholder}  type="text"  value={value }  className="validate" onChange={e=> onChange ? onChange(e.target.value) : false}/>
            <label>{label}</label>
        </div>);
    }
}
