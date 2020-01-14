import React, {Fragment, Component } from 'react';
// import M from 'materialize-css';

export default class Collapsible extends Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.instance = null;
    }

    componentDidMount() {
        // console.warn('cDidMount ref', this.myRef.current);
        this.instance = M.Collapsible.init(this.myRef.current, {});
    }

    componentDidUpdate() {
        this.instance = M.Collapsible.init(this.myRef.current, {});
    }

    componentWillUnmount() {
        if(this.instance) this.instance.destroy();
    }

    render() {
        const {  children } = this.props;

        return (
            <ul ref={this.myRef} className="collapsible">
                {children}
            </ul>
        );
    }
}