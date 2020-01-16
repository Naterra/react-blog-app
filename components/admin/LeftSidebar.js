import React, {Fragment,Component } from 'react';
import UserAvatarBlock from './UserAvatarBlock';
import Link from 'next/link';
// import Collapsible from '../Materialize/Collapsible';

export default class LeftSidebar extends React.Component {
    render(){
        return( <div className="col s3 admin-left-sidebar">
                    <UserAvatarBlock {...this.props} />
                     <ul className='adminMenu'>
                         <li>
                             <Link href="/admin"><a><i className="material-icons">dashboard</i><span className="title">Dashboard</span></a></Link>
                         </li>
                         <li>
                             <Link href="/admin/pages"><a><i className="material-icons">chevron_right</i><span className="title">Pages</span></a></Link>
                         </li>
                         <li>
                             <Link href="/admin/settings"><a><i className="material-icons">chevron_right</i><span className="title">Settings</span></a></Link>
                         </li>
                     </ul>

                    <style jsx>{`
                        .adminMenu li span{
                            margin-left: 10px;
                        }
                        .adminMenu li{
                            padding: 10px;
                        }

                    `}</style>
                </div>);
    }
}




// class AdminMenu extends React.Component {
//     render() {
//         return(<Fragment>
//                   <Collapsible>
//                         <li>
//                             <div className="collapsible-header">
//                                 <Link href="/admin"><a><i className="material-icons">dashboard</i><span className="title">Dashboard</span></a></Link>
//                             </div>
//                             <div className="collapsible-body"></div>
//                         </li>
//                       <li>
//                           <div className="collapsible-header">
//                               <Link href="/admin/sets"><a><i className="material-icons">dashboard</i><span className="title">Sets</span></a></Link>
//                           </div>
//                           <div className="collapsible-body"></div>
//                       </li>
//
//                         {/*<li>*/}
//                             {/*<div className="collapsible-header"><i className="material-icons">filter_drama</i><span className="title"><a>Places</a></span><i className="material-icons right">arrow_drop_down</i></div>*/}
//                             {/*<div className="collapsible-body">*/}
//                                 {/*<ul>*/}
//                                     {/*<li><Link href="/admin/sets"><a>Sets</a></Link></li>*/}
//                                     {/*/!*<li><Link href="/admin/places_search"><a>Places Search</a></Link></li>*!/*/}
//                                     {/*/!*<li><Link href="/admin/citys_list_page"><a>City's List</a></Link></li>*!/*/}
//                                 {/*</ul>*/}
//                             {/*</div>*/}
//                         {/*</li>*/}
//                       {/*<li>*/}
//                           {/*<div className="collapsible-header">*/}
//                               {/*<Link href="/admin/settings"><a><i className="material-icons">settings</i>Settings</a></Link>*/}
//                           {/*</div>*/}
//                       {/*</li>*/}
//
//
//                     </Collapsible>
//             </Fragment>
//         );
//
//     }
// }