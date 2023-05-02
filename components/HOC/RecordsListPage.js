import React, {Component, Fragment} from 'react';
import Link from "next/link";
import RecordsListWithPaging from '../RecordsListWithPaging';

/** Actions **/
import * as  actions from '../../store/actions';
import store from '../../store/reducer';
import Router from "next/router";
import * as forms from "../Forms";






// export const recordsListPage =(props)=>{
const recordsListPage =(props)=>{
const { model, router,  pageTitle, ItemsListView } = props;
    const {edit, action} =router.query;

    const getRecordsFn = store.dispatch(actions[`get${model}s`]);
    const Form = forms[`${model}Form`];


    const HOC = class extends Component{
        render(){
            console.log('>>>HOC:render', props);
            console.log('>>>HOC:forms', Form);

            return (<div>


                {!router.query["edit"] && !router.query["action"] && (<Fragment>
                    <h3>{pageTitle}</h3>
                    <CreateNewRecordBtn {...props}/>
                    <RecordsListWithPaging
                        ElComponent={ItemsListView}
                        queryParam={{}}
                        getRecordsFn={getRecordsFn}
                        asTable={true}
                        tableHeader={['Title','Actions']}
                    />
                </Fragment>)}


                {/* Create Set Subpage */}
                {router.query["action"]=='new' && (<div>
                    <GoBackBtn />
                    <h3>Create Record</h3>
                    <Form mode="new"/>
                </div>)}

                {/* Edit Set Subpage */}
                {router.query["edit"] && (<div>
                    <GoBackBtn />
                    <h3>Edit Record</h3>
                    <Form mode="edit" {...props}/>
                </div>)}

            </div>)
        }
    };

    return HOC;
};




const CreateNewRecordBtn =()=>{
    return(<div style={{marginBottom: '20px'}}>
        <Link href={`?action=new`}>
            <a className="waves-effect waves-light btn">Create New</a>
        </Link>
    </div>);
};

const GoBackBtn =()=>{
    return(<div onClick={() => Router.back()} style={{color: '#929292'}}>{'<< Go Back'}</div>);
};

export default recordsListPage;