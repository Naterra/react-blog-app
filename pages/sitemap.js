import React, { Component } from 'react'
import Layout from '../components/layouts/Layout'


export default class extends Component {
    render() {
        console.error('Index', this.props.session);

        return (
            <Layout {...this.props}  container={true}>
                <h1>Sitemap</h1>

                <div className="row">

                </div>
            </Layout>
        )
    }
}