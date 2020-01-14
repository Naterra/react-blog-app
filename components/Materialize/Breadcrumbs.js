import React from 'react';
import Link from 'next/link';

/**
 *
 * @param links = {link, title}
 * @returns {*}
 */
export default (props)=>{
    const { data } = props;

    return(<div className="breadcrumbs col s12 ">
        <a href='/'><i className="material-icons" style={{color:'#7e827e', verticalAlign: 'sub', fontSize: '16px'}}>home</i></a>
        { data &&  data.map((el, i)=> (<a key={i}  href={el.link} className="breadcrumb ">
                 {el.title}
            </a>))}


        <style jsx>{`
            .breadcrumb{
                font-size: 13px;
            }
			.breadcrumb:before {
                color: #7e827e;
                font-size: 16px;
            }
            .breadcrumb, .breadcrumb:last-child {
                color: #7e827e;
            }
			`}</style>
    </div>);
}