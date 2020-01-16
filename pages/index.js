import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from "react-redux";
import { Parallax, Background } from 'react-parallax';

/**  Components  **/
import Layout from '../components/layouts/Layout'
// import Parallax from '../components/Materialize/Parallax/parallax';



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
        

          <Parallax
              blur={0}
              bgImage={('/static/banner/bg12.jpg')}
              // bgImage={('/static/banner/bg5.5.jpg')}
              bgImageAlt="the cat"
              strength={50}
              renderLayer={percentage => (
                  <div
                      style={{
                          position: 'absolute',
                          background: `rgba(4, 69, 125, 0.5)`,
                          left: '20%',
                          top: '27%',
                          width: '60%',
                          height: '270px',
                          color: '#eff8ff',
                          padding: '10px'
                      }}
                  >
                      <div style={{fontSize:'27px',marginTop: '45px', fontStyle: 'italic', color:'#fff', textAlign: 'center'}}>Explore the world
                            <div>of</div>
                            <div style={{fontSize:'62px' }}>Switzerland</div>
                      </div>
                  </div>
              )}
          >
              {/*Put some text content here - even an empty div with fixed dimensions to have a height*/}
              {/*for the parallax.*/}
              <div style={{ height: '400px' }} />
          </Parallax>

          <div className="container">
              {record && <div className="row description ckEditorContent" dangerouslySetInnerHTML={{ __html: record.description }} />}
          </div>

      </Layout>
    )
  }
}

export default connect(null, { getPages })(MainPage);