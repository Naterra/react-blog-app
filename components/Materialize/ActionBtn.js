import React, { Component, Fragment } from 'react';
import Tooltip from './Tooltip';


class ActionBtn  extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.instance = null;
    }
    componentDidMount() {
       const elems = this.myRef.current;
       this.instance = M.FloatingActionButton.init(elems, {
           direction:"left",
           hoverEnabled: false
       });
    }
    componentWillUnmount () {
        this.instance.destroy();
    }
    render(){
     const {greenText, yellowText, onDeleteCallback} = this.props;

        return (<div ref={this.myRef} className="fixed-action-btn" style={{position: "absolute", top: "5px", right: "5px"}}>
            <a className="btn-floating btn-small blue">
                <i className="large material-icons">more_vert</i>
            </a>
            <ul>
               <Tooltip color="green" tooltipData={greenText} icon="edit" onClick={this.props.onGreenClick}/>
               <Tooltip color="yellow darken-1" tooltipData={yellowText} icon="close" onClick={this.props.onYellowClick}/>
              </ul>
        </div>);
    }
};




export default ActionBtn;