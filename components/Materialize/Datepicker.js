import React, { Component, Fragment } from 'react';


class Datepicker extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.instance;
    }
    componentDidMount(){
        let options={
        };
        this.instances = M.Datepicker.init(this.myRef.current, options);
    }
    componentDidUpdate(prevProps, prevState){
        let options={
        };
        this.instances = M.Datepicker.init(this.myRef.current, options);
    }
    render(){
        return(<input ref={this.myRef} type="text" className="datepicker" />);
    }
}

export default Datepicker;
