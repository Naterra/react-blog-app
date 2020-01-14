import React from 'react';
import $ from 'jquery';

export default class extends React.Component{
    componentDidMount() {
        // $('select').formSelect();
    }
    render(){
        const { label="", value="" } = this.props;

        return(<div className="input-field">
            <input disabled placeholder="Radius" id="radius" type="text" className="validate" defaultValue={value} />
            <label>{label}</label>
        </div>);
    }
}