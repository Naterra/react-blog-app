import React, { Component }  from 'react';
import { withRouter } from 'next/router';
import { connect } from "react-redux";
import Link from 'next/link';
import Router from 'next/router';

 /** Components **/
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import PrivatePage from '../../components/PrivatePage';
import SetForm from '../../components/Forms/SetForm';
import RecordsListWithPaging from '../../components/RecordsListWithPaging';
import Tabs from '../../components/Materialize/Tabs/Tabs';
import CollectionsView from '../../components/admin/Collections/CollectionsView';

/** Actions **/
import { getSets  } from '../../store/actions';


class SetsPage extends PrivatePage{
    constructor(props){
        super(props);
        this.state={
            modalStatus:false
        }
    }

  render() {
      const { router } = this.props;

      const setId=router.query['edit'] || false;
      const tabId='setFormTab';

    return (
      <AdminPageLayout {...this.props} >

          {/* Sets List / Main Set View */}
          {!router.query["action"]&& !router.query["edit"] &&(<div>
              <h3>Sets</h3>
              <CreateSetBtn />
              <RecordsListWithPaging
                  ElComponent={SetListItemView}
                  queryParam={{}}
                  getRecordsFn={this.props.getSets}
                  asTable={true}
                  tableHeader={['Title','Actions']}
              />
          </div>)}



          {/* Create Set Subpage */}
          {router.query["action"]=='new_set' && (<div>
              <GoBackBtn />
              <h3>Create Set</h3>
              <SetForm mode="new"/>
          </div>)}

          {/* Edit Set Subpage */}
          {router.query["edit"] && (<div>
              <GoBackBtn />
              <h3>Edit Set</h3>

              <Tabs id={tabId} menuList={['Settings', 'Collections']} extraClass={'BlueTabMenu'} >
                  <div id={`tab-${tabId}-1`}  className="col s12 mapTool">
                      <div className="tab-content">
                          <SetForm mode="edit" {...this.props}/>
                      </div>
                  </div>


                  <div id={`tab-${tabId}-2`}  className="col s12">
                      <div className="tab-content" style={{paddingTop:"30px"}}>
                          <CollectionsView setId={setId} {...this.props} />
                      </div>
                  </div>
              </Tabs>


          </div>)}
      </AdminPageLayout>
    )
  }
}





const SetListItemView =(props)=>{
    const { data } = props;
    return(<tr onClick={e=> Router.push(`/admin/sets?edit=${data._id}`)}>
            <td>{data.title}</td>
            <td style={{width:'20px'}}>
                <Link href={`/admin/sets?edit=${data._id}`}>
                    <a><i title="Edit" className="material-icons tiny">create</i></a>
                </Link>
            </td>
        </tr>);
};



const GoBackBtn =()=>{
    return(<div onClick={() => Router.back()} style={{color: '#929292'}}>{'<< Go Back'}</div>);
};

const CreateSetBtn =()=>{
        return(<div className='col s12' style={{marginBottom: '20px'}}>
                <Link href="/admin/sets?action=new_set">
                    <a className="waves-effect waves-light btn">Create New Set</a>
                </Link>
            </div>);
};


export default connect(null, {getSets})(withRouter(SetsPage));
