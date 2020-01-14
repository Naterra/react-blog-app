import React, { Component, PureComponent } from 'react';
// import $ from 'jquery';
//
// if (typeof window !== 'undefined') {
//     window.$ = $;
//     window.jQuery = $;
//     require('materialize-css');
// }

class Autocomplete extends React.PureComponent{
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state={
            typingTimeout: null
        };

        this.instance=null;
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.valueChange = this.valueChange.bind(this);
    }
    componentDidMount() {
       const { data } = this.props;
        let el = this.myRef.current;

        const options = {
            data: data,
            onAutocomplete: (val) =>{
                this.onSelectEvent(val);
            }
        };

        this.instance = M.Autocomplete.init(el, options);
    }

    componentDidUpdate(prevProps, prevState){
        const { data, input, onKeywordChangeCallback } = this.props;




        if(prevProps.input.value !== input.value) {
            console.error('__ Autocomplete::input val changed');
            this.instance.open();
            onKeywordChangeCallback();
        }

        if(prevProps.data !== data){
            console.error('__ Autocomplete:: data changed', {oldData:prevProps.data, data});
            this.instance.updateData( data );
            // this.instance.open();
        }

    }

    componentWillUnmount() {
        this.instance.destroy();
    }

    valueChange(keyword) {
        const { typingTimeout } = this.state;

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        this.setState({
            typingTimeout: setTimeout(async() => {
                console.warn("**** Autocomplete CHANGED _____", keyword);
                this.props.input.onChange(keyword);
                this.instance.open();
            }, 800)
        });
    }


    onSelectEvent(newValue){
        if(!newValue) return;
        const { input, onChange, data } = this.props;
        const id =data[newValue].id;

        input.onChange(newValue);
        this.props.onSelectCallback({id, val:newValue});

        // At the end of all state changes
        this.instance.close();
    }
    render(){
        const { icon, placeholder } = this.props;
        // console.warn("Autocomplete::render", this.props);

        return(<div className="input-field col s12">
            <i className="material-icons prefix">{icon}</i>

            <input
                onChange={(e) => this.valueChange(e.target.value)}
                placeholder={placeholder}
                ref={this.myRef}
                defaultValue={this.props.defaultValue  }
                type="text"
                id="autocomplete-input"
                className="autocomplete"
                autoComplete="off"
            />

        </div>);
    }
}

export default Autocomplete;