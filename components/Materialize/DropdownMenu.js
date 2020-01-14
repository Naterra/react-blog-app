import React, {Fragment} from 'react';

class DropdownMenu extends React.Component{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.instances;
    }
    componentDidMount(){
        let options={
            coverTrigger: false,
            alignment: 'right',
            constrainWidth: false
        };
        this.instances = M.Dropdown.init(this.myRef.current, options);
    }
    componentDidUpdate(prevProps, prevState){
        let options={
            coverTrigger: false,
            alignment: 'right',
            constrainWidth: false
        };
        this.instances = M.Dropdown.init(this.myRef.current, options);
    }
    render(){
        const { id, activeComponent } = this.props;

        return(<div className="drpodown-menu">
                <a ref={this.myRef} className="dropdown-trigger" href="#!" data-target={`dropdown${id}`}>
                    {activeComponent || (<i className="material-icons right">arrow_drop_down</i>)}
                    {/**/}
                </a>

            <ul  id={`dropdown${id}`} className="dropdown-content">
                {this.props.children}
            </ul>

        </div>);
    }
}

export default DropdownMenu;