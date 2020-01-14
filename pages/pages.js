import React, { Component } from 'react';
import { connect } from "react-redux";
import Link from 'next/link';
import { withRouter } from 'next/router';

/**  Components  **/
import Layout from '../components/layouts/Layout'
import RecordsListWithPaging from "../components/RecordsListWithPaging";
import RecordPreview from "../components/Sets/RecordPreview";

/**  Actions  **/
import { getPage  } from '../store/actions';




class PagesPage extends Component {
    constructor(props){
        super(props);
        this.state={
            records:null,
            record:null,
        }
    }

    componentDidMount() {
        const { router } = this.props;
        const pageId = router.query.id || false;
        if(pageId){
            this.props.getPage(pageId)
                .then(res=>{
                   this.setState({record:res});
                })
                .catch(err=>{});
        }else{

        }
    }

    render() {
        const { router } = this.props;
        const { record } = this.state;

        console.log("PAGE", this.props);
        const meta={
            title:"",
            description:""
        };
        const pageId = router.query.id || false;


        return (
            <Layout meta={meta}   frontPage={false} container={false} fixedContainer={true} {...this.props} >

                {pageId && record && (<div>
                    <h1>{record.title}</h1>
                    <div className="row description ckEditorContent" dangerouslySetInnerHTML={{ __html: record.description }} />

                </div>)}

                {/*<h1>Pages</h1>*/}

                {/*<div className='row'>*/}
                    {/*<RecordsListWithPaging*/}
                        {/*ElComponent={RecordPreview}*/}
                        {/*queryParam={{populateSetData:true, title:"Pictures"}}*/}
                        {/*getRecordsFn={this.props.getCollections}*/}
                        {/*asTable={true}*/}
                    {/*/>*/}
                {/*</div>*/}
            </Layout>
        )
    }
}

PagesPage = withRouter(PagesPage);
export default connect(null, { getPage})(PagesPage);