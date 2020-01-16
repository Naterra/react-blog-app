import React from 'react';
import LeftSidebar from "../admin/LeftSidebar";
import Layout from './Layout';


export default class AdminPageLayout extends React.Component{
    render(){
        return(<Layout pageClass={'adminPage'} {...this.props} container={false}>
            {/*<div className="row flex">*/}
                <LeftSidebar {...this.props}/>
                <div className="col s9">{this.props.children}</div>
            {/*</div>*/}
        </Layout>);
    }
}