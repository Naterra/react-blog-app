import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from "react-redux";

/**  Components  **/
import Layout from '../components/layouts/Layout'
import Parallax from '../components/Materialize/Parallax/parallax';



/** Actions **/
import { getPages  } from '../store/actions';



class MainPage extends Component {
    constructor(props){
        super(props);
        this.state={
            record:null
        }
    }
    componentDidMount() {
        this.props.getPages()
            .then(res=>{
                const records = res.items.filter(item=>item.showOnFront==true);
                this.setState({record: records[0]})
            })
            .catch(err=>{

            });
    }

    render() {
       const {record} = this.state;
    const meta={
        title:"",
        description:""
    };

    return (
      <Layout meta={meta} pageClass="mainPage" frontPage={true} container={false} {...this.props} >
          <Parallax image="/static/banner/parallaxBanner.jpg" {...this.props} />

          <div className="container">
              {record && <div className="row description ckEditorContent" dangerouslySetInnerHTML={{ __html: record.description }} />}
          </div>

      </Layout>
    )
  }
}

export default connect(null, { getPages })(MainPage);