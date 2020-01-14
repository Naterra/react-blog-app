import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';

/**  Components  **/
import Layout from '../components/layouts/Layout'
import ContactForm from "../components/Forms/ContactForm";

/**  Actions  **/
import {    } from '../store/actions';




class Contact extends Component {
    constructor(props){
        super(props);
        this.state={
            records:null
        }
    }

    render() {
        const meta={
            title:"Contact Us",
            description:"Contact Us"
        };

        return (
            <Layout meta={meta}   container={true} fixedContainer={false} {...this.props} >
                <h1>Contact Us</h1>
            <ContactForm />


            </Layout>
        )
    }
}


export default connect(null, { })(Contact);