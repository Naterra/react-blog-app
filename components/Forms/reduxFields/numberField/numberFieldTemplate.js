import * as React      from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import reactCssModules from 'react-css-modules';


import styles1 from "../../../App.css";
import styles2 from './numberFieldTempl.module.css';
const styles = Object.assign(styles1, styles2);


class InputNumber extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.inputRef = React.createRef();
    }

    decrement() {
        const value = this.state.value > (this.props.min || 0) ? this.state.value - 1 : this.state.value;
        this.inputRef.current.value = value;
        ReactTestUtils.Simulate.change(this.inputRef.current);
    }

    increment() {
        const value = this.state.value < (this.props.max || 500) ? this.state.value + 1 : this.props.max;
        this.inputRef.current.value = value;
        ReactTestUtils.Simulate.change(this.inputRef.current);
    }


    valueChange(e) {
        this.setState({
            value: Number(e.target.value)
        });
        this.props.input.onChange(e);
    }

    render() {

        const { input, label, placeholder, isRequired, min, max, meta: { touched, error, warning } } = this.props;

        return (
            <div className={isRequired ? 'input-number-required' : 'input-number'}>
                <label>{label}</label>

                <div className="form-field-error">
                    {touched &&
                    ((error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>))}
                </div>

                <div className="input-number-container">
                    <input onChange={(e) => this.valueChange(e)} ref={this.inputRef} type="number" placeholder={placeholder || ''} min={min || 0} max={max || 500}/>
                    <div className="number-counter">
                        <span className="number-minus" onClick={() => this.decrement()}>-</span>
                        <span className="number-plus" onClick={() => this.increment()}>+</span>
                    </div>
                </div>
            </div>
        );

    }
}

export default reactCssModules(InputNumber, styles);
