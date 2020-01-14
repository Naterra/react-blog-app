import React from 'react';
import {Field, reduxForm} from "redux-form";
import textareaFieldTempl from "../Forms/reduxFields/textareaFieldTempl";
import inputFieldTempl from "../Forms/reduxFields/inputFieldTempl";


/**  Actions  **/
import {  addSettings, editSettings, getSettings, generateClearUrl } from '../../store/actions';
import {connect} from "react-redux";

class MailingSettingsForm extends React.Component{
     constructor (props) {
        super(props);

         this.state={
             settings:null,
             settingName:"mailing"
         };


    }
   async  componentDidMount(){
         const { settingName } = this.state;

        let settings = await this.props.getSettings(settingName);
        // this.setState({settings});
        console.error('settings',settings);

       if(settings){
           this.props.change("email", settings.param.email ||"");
           this.props.change("email_server", settings.param.email_server);
           this.props.change("port", settings.param.port);
           this.props.change("email_password", settings.param.email_password);
       }

    }

    onSubmit = (values) =>{
        console.error('Submit',values);
        const { settingName } = this.state;

        if(this.state.settings){
            this.props.editSettings(settingName, values , this.props.session.csrfToken);
        }else{
            this.props.addSettings(settingName, values , this.props.session.csrfToken);
        }

    };


    render(){
        const { handleSubmit } = this.props;
        // console.error('render', this);

        return(<div className="col s12">
            <h4>Mailing Settings</h4>
            <blockquote>
                Not Implemented
            </blockquote>

            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="row">
                <Field name="email" label="Email From" component={inputFieldTempl} placeholder="sitename_support@gmail.com" />
                <br/>


                    <Field name="mail_server_host" label="Mail Server Host" component={inputFieldTempl} placeholder="smtp.gmail.com" />
                    <Field name="mail_server_port" label="Mail Server Port"  component={inputFieldTempl} placeholder="465" />
                    <Field name="mail_server_username" label="Mail Server User" component={inputFieldTempl} placeholder="sitename_servise_email@gmail.com" />
                    <Field name="mail_server_password" label="Mail Server Password" component={inputFieldTempl} placeholder="FluffyCat" />

                <button className="btn right" type="submit" >Save</button>
            </form>
        </div>);
    }
}

/** Redux-Form wrapper **/
MailingSettingsForm = reduxForm({
    // a unique name for the form
    form: 'mailing',
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
})(MailingSettingsForm);

function mapStateToProps(state, ownProps, ownState){
    console.log('ownProps',ownProps);
    console.log('ownState',ownState);

    return state;
}
export default connect(null, {  addSettings, editSettings,  getSettings })(MailingSettingsForm);

