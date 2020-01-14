import React, { Component, Fragment } from 'react';

class Tooltip extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.instance = null;
    }
    componentDidMount() {
        const elems = this.myRef.current;
        this.instance = M.Tooltip.init(elems, {
            position:"top"
        });
    }
    componentWillUnmount () {
        this.instance.destroy();
    }
    render(){
        const {color, icon, tooltipData} = this.props;
        // console.warn("Tooltip", this.props);

        return(<a ref={this.myRef} onClick={this.props.onClick} className={`btn-floating ${color}`} data-tooltip={tooltipData}>
            <i className="material-icons">{icon}</i>
        </a>)
    }
}

export default Tooltip;