import React  from 'react';


 /** Components **/
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import PrivatePage from '../../components/PrivatePage';


class MainAdmin extends PrivatePage{

  render() {
      const {session} = this.props;


    return (
      <AdminPageLayout {...this.props} >
            <h3> Welcome!</h3>
      </AdminPageLayout>
    )
  }
}



export default MainAdmin;
